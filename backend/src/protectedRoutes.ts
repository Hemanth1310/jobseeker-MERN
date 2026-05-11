import express from "express"
import { prisma } from "./prisma.js"

const router = express.Router()

router.get('/user-details',async(req,res)=>{
    const email = req.userData?.email

    if(!email){
        return res.status(404).json({error:'Email invalid'})
    }
    try{
        const user = await prisma.user.findFirst({
            where:{
                email:email
            }
        })

        if(!user){
             return res.status(404).json({error:'User not found.'})
        }

        const {password, ...rest} =user 

        res.status(200).json({
            payload:rest,
            message:"User verified."
        })
    }catch(err){
        return res.status(404).json({error:"User not found."})
    }
})

export default router