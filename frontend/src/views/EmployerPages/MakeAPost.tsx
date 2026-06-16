import { useState } from 'react'
import { jobPostingSchema } from '../../utils/TypeChecker'
import axios from '../../utils/authMiddleware'
import { toast } from 'react-toastify'
import { AxiosError } from 'axios'
import { useNavigate } from 'react-router'
import { type JobFormState, type JobFormErrors } from '../../types'
import JobPostForm from '../../components/layouts/JobPostForm'

const BASE_API_URL = import.meta.env.VITE_API_URL

const MakeAPost = () => {
    const navigate=useNavigate()
    const [jobData,setJobData]= useState<JobFormState>({
        title: "",
        description: "",
        companyName: "",
        location: "",
        jobType: "",
        experience: "",
        category: "",
        salary:""
    })

    const [errors,setErrors]= useState<JobFormErrors>({
        title: "",
        description: "",
        companyName: "",
        location: "",
        jobType: "",
        experience: "",
        category: "",
        salary:"",
        apiResponse:""
    })

    const [isPendeing,setIsPending] = useState(false)

  

    const handleSubmit=async()=>{
        setIsPending(true)
        const parsedData = jobPostingSchema.safeParse(jobData)

        if(!parsedData.success){
            for(const issue of parsedData.error.issues){
                setErrors(prev=>({...prev, [issue.path[0]]:issue.message}))
            }
            setIsPending(false)
            return
        }

        try{
            await axios.post(`${BASE_API_URL}/api/private/make-a-post`,parsedData.data)
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
                       navigate('/employer/dashboard') 
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
   <div className='w-full h-full flex flex-col gap-5'>
        <h1 className='text-2xl'>Make A Post</h1>
        <JobPostForm jobData={jobData} setJobData={setJobData} handleSubmit={handleSubmit} errors={errors} isPending={isPendeing}/>
    </div>
  )
}

export default MakeAPost