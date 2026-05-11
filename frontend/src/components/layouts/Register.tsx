import React, { useState } from 'react'
import type { toggeler } from '../../types'
import { registerSchema } from '../../utils/TypeChecker'
import { AxiosError } from 'axios'
import axios from '../../utils/authMiddleware'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router'
type Props = {
    toggleTo:(val:toggeler)=>void,
    onClose:()=>void
}

const BASE_API_URL = import .meta.env.VITE_API_URL
const Register = ({onClose,toggleTo}: Props) => {
    const navigate = useNavigate()
     const [formData, setFormData] = useState({
        email: "",
        password: "",
        repassword:"",
        firstName: "",
        lastName: "",
        role:"CANDIDATE"
    })

    const [isPendeing, setIsPending] = useState(false)

    const [errors, setErrors] = useState({
        email: "",
        password: "",
        repassword:"",
        firstName: "",
        lastName: "",
        apiResponse: ""
    })

    const handleChange = (e : React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>)=>{
        const {name, value} = e.target

        setFormData(prev=>({...prev, [name]:value}))
    }

    const handleRegistration = async()=>{
        setIsPending(true)
        const parsedDetails = registerSchema.safeParse(formData)
        if(!parsedDetails.success){
            for(const issue of parsedDetails.error.issues){
                setErrors(prev=>({...prev,[issue.path[0]]:issue.message}))  
            }
            setIsPending(false)
             return
        }
        if(parsedDetails.data.password !== formData.repassword){
            setErrors(prev=>({...prev,password:"Passwords dont match."}))
            setIsPending(false)
            return
        }

        try{
            await axios.post(`${BASE_API_URL}/api/auth/register`, parsedDetails.data)

            toast.success('Registration Successful',{
                                position: "top-right",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: false,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "light",
                        })
            setIsPending(false)
            navigate('/') 
            onClose()
        }catch(err){
            if(err instanceof AxiosError){
                setErrors(prev=>({...prev, apiResponse:err.response?.data.error}))
            }else{
                setErrors(prev=>({...prev, apiResponse:"Unexpected Error occured."}))
            }
            setIsPending(false)
            toast.error('Registration Failed',{
                                position: "top-right",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: false,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "light",
            })
        }

    }

  return (
   <form action={handleRegistration} className='w-full h-full pt-3 flex flex-col items-center gap-5'>
        <div className='w-full flex flex-col gap-1'>
            <label >Username:</label>
            <input type='email' name='email' className='w-full border-2 rounded-lg border-mist-200 text-lg p-1 pl-3' value={formData.email} onChange={handleChange}></input>
            {errors.email && <p className='text-xs text-red-500'>{errors.email}</p>}
        </div>
        <div className='w-full flex flex-col gap-1'>
            <label >First Name:</label>
            <input type='string' name='firstName' className='w-full border-2 rounded-lg border-mist-200 text-lg p-1 pl-3' value={formData.firstName} onChange={handleChange}></input>
            {errors.firstName && <p className='text-xs text-red-500'>{errors.firstName}</p>}
        </div>
        <div className='w-full flex flex-col gap-1'>
            <label >Last Name:</label>
            <input type='string' name='lastName' className='w-full border-2 rounded-lg border-mist-200 text-lg p-1 pl-3' value={formData.lastName} onChange={handleChange}></input>
            {errors.lastName && <p className='text-xs text-red-500'>{errors.lastName}</p>}
        </div>
        <div className='w-full flex items-center gap-1'>
            <label >Role:</label>
            <select name='role' className='border-2 rounded-lg border-mist-200 text-lg p-1 pl-3' value={formData.role} onChange={handleChange}>
                <option value="CANDIDATE"> Candidate</option>
                <option value="EMPLOYER">Employer</option>
            </select>
        </div>
        <div className='w-full flex flex-col gap-1'>
            <label >Password:</label>
            <input type='password' name='password' className='w-full border-2 rounded-lg border-mist-200 text-lg p-1 pl-3' value={formData.password} onChange={handleChange}></input>
             {errors.password && <p className='text-xs text-red-500'>{errors.password}</p>}
        </div>
        <div className='w-full flex flex-col gap-1'>
            <label >Re-Enter Password:</label>
            <input type='password' name='repassword' className='w-full border-2 rounded-lg border-mist-200 text-lg p-1 pl-3' value={formData.repassword} onChange={handleChange}></input>
             {errors.repassword && <p className='text-xs text-red-500'>{errors.password}</p>}
        </div>
        {errors.apiResponse && <p className='text-xs text-red-500'>Registration Failed: {errors.apiResponse}</p>}
        <button type='submit' disabled={isPendeing} className='w-full h-10 p-1 bg-brand-primary rounded-lg text-white'>{isPendeing?"Loading":"Register"}</button>
        
        <p>Already a user ? <span className='text-blue-500' onClick={()=>toggleTo('login')}>Login Here</span></p>
    </form>
  )
}


export default Register