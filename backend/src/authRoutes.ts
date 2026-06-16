import express from 'express'
import { loginSchema, registerSchema } from './utils/typechecker.js'
import { prisma } from './prisma.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import type { UserCreateInput } from '../generated/prisma/models.js'
import { PrismaClientKnownRequestError } from '../generated/prisma/internal/prismaNamespace.js'

const router = express.Router()

const jwtSecret = process.env.JWT_SECRET || '123456789'

router.post('/register', async(req,res)=>{
    const registerDetails = req.body
    const parsedRegisterDetails = registerSchema.safeParse(registerDetails)

    if(!parsedRegisterDetails.success){
        return res.status(400).json({error:"Invalid registration details"})
    }

    const {email, password, firstName, lastName, role} = parsedRegisterDetails.data
    const hashedPassword = await bcrypt.hash(password,10)
    try{
        await prisma.user.create({
            data:{
                email,
                password:hashedPassword,
                firstName,
                lastName,
                role
            }
        })

        return res.status(201).json({message:'Registration successfull'})
    }catch(err){
        if(err instanceof PrismaClientKnownRequestError){
            if(err.code ==='P2002'){
                return res.status(403).json({error:"A record with this email already exists." })
            }
        }

        return res.status(500).json({error:'Unexpected error occurred'})
    }
})

router.post('/login',async(req,res)=>{
    const loginDetails = req.body
    const parsedLoginDetails = loginSchema.safeParse(loginDetails)

    if(!parsedLoginDetails.success){
        return res.status(400).json({error:'Invalid format'})
    }

    const {email, password} = parsedLoginDetails.data

    try{
        const user = await prisma.user.findFirst({
            where:{
                email:email
            }
        })
        if(!user){
            return res.status(401).json({error:'User not found'})
        }

        const isValid = await bcrypt.compare(parsedLoginDetails.data.password, user.password)
        
        if(!isValid){
            return res.status(403).json({error:'Invalid password!'})
        }
        const {password, ...rest} = user
        const tokenPayload = {...rest}

        const token = await jwt.sign(tokenPayload,jwtSecret, {expiresIn:'1hr'} )

        if(!token){
            return res.status(500).json({error:'Unexpected error occurred'})
        }

        const isProduction = process.env.NODE_ENV === 'production'
        res.cookie('token',token,{
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? 'none' : 'strict',
            maxAge: 24 * 60 * 60 * 1000,
        })

        res.cookie('hasAuth','1',{
            httpOnly: false,
            secure: isProduction,
            sameSite: isProduction ? 'none' : 'strict',
            maxAge: 24 * 60 * 60 * 1000,
        })

        return res.status(200).json({
            message:'Login successful',
            payload:{
                ...rest
            }
        })
    }catch(err){
        if(err instanceof PrismaClientKnownRequestError){
            if(err.code==='P2025'){
                return res.status(401).json({error:'User not found'})
            }
        }
        return res.status(500).json({error:'Unexpected error occurred'})
    }
})

export default router