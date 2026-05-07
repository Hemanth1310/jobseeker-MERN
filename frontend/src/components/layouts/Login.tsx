import React,{useState} from 'react'
import { loginSchema } from '../../utils/TypeChecker'
import axios from '../../utils/authMiddleware'
import { toast } from 'react-toastify'
import { useAuthContextData } from '../../utils/useAuthContextData'
import type { toggeler, User } from '../../types'
import { AxiosError } from 'axios'
import { useNavigate } from 'react-router'
type Props = {
    toggleTo:(val:toggeler)=>void,
    onClose:()=>void
}


const API_URL = import.meta.env.VITE_API_URL

const Login = ({toggleTo, onClose}: Props) => {
    const {updateUserData} = useAuthContextData()
    const navigate=useNavigate()
    const [errors, setErrors] = useState({
       email:"",
        password:"",
        apiResponse:""
    })

    const handleLogin =async (formData:FormData)=>{
        const loginDetails = Object.fromEntries(formData.entries())
        const parsedLoginDetails = loginSchema.safeParse(loginDetails)

        if(!parsedLoginDetails.success){
            for(const issue of parsedLoginDetails.error.issues){
                setErrors(prev=>({...prev,[issue.path[0]]:issue.message}))
            }
            return
        }

        try{
            const response = await axios.post(`${API_URL}/api/auth/login`,parsedLoginDetails.data)
            if(!response.status){
                throw new Error('Unexpected error occured.')
            }
            toast.success('Login Successful',{
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
            })
            updateUserData(response.data as User)
            onClose()
            navigate('/')
        }catch(err){
            if(err instanceof AxiosError){
                setErrors(prev=>({...prev, apiResponse:err.message}))
                return
            }
            setErrors(prev=>({...prev, apiResponse:'Unexpected error occured.'}))
        }
    }
  return (
    <form action={handleLogin} className='w-full h-full pt-3 flex flex-col items-center gap-5'>
        <div className='w-full flex flex-col gap-1'>
            <label >Username:</label>
            <input type='email' name='email' className='w-full border-2 rounded-lg border-mist-200 text-lg p-1 pl-3'></input>
            {errors.email && <p className='text-xs text-red-500'>{errors.email}</p>}
        </div>
        <div className='w-full flex flex-col gap-1'>
            <label >Password:</label>
            <input type='password' name='password' className='w-full border-2 rounded-lg border-mist-200 text-lg p-1 pl-3'></input>
             {errors.password && <p className='text-xs text-red-500'>{errors.password}</p>}
        </div>
        {errors.apiResponse && <p className='text-xs text-red-500'>Login Failed: {errors.apiResponse}</p>}
        <button className='w-full h-10 p-1 bg-brand-primary rounded-lg text-white'>Login</button>
        
        <p>Not registered ? <span className='text-blue-500' onClick={()=>toggleTo('register')}>Register Here</span></p>
    </form>
  )
}

export default Login