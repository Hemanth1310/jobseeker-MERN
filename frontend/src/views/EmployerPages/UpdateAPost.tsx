import { useEffect, useState } from 'react'
import { jobPostingSchema } from '../../utils/TypeChecker'
import axios from '../../utils/authMiddleware'
import { toast } from 'react-toastify'
import { AxiosError } from 'axios'
import { useNavigate, useParams } from 'react-router'
import { type JobFormState, type JobFormErrors } from '../../types'
import JobPostForm from '../../components/layouts/JobPostForm'
import Loading from '../../components/layouts/Loading'

const BASE_API_URL = import.meta.env.VITE_API_URL

const UpdateAPost = () => {
    const {id} = useParams()
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
      const [isLoading, setIsLoading] = useState(true)
  
    if(!id){
       navigate('/employer/dashboard')
    }
    
    
    useEffect(()=>{
        const fetchJobData=async()=>{
            try{
                const {data} = await axios.get(`${BASE_API_URL}/api/private/employer/jobPosting/${id}`)
                const parsedData = jobPostingSchema.safeParse(data.payload)

                if(!parsedData.success || !parsedData.data){
                    console.log('Failed to fetch Job post')
                    navigate('/employer/dashboard')
                    return
                }
                const job = parsedData.data
                setJobData({
                        title: job.title || "",
                        description: job.description || "",
                        companyName: job.companyName || "",
                        location: job.location || "",
                        jobType: job.jobType || "",
                        experience: job.experience || "",
                        category: job.category || "",
                        salary: job.salary !== null && job.salary !== undefined ? String(job.salary) : ""
                    })
                    setIsLoading(false)

            }catch(err){
                console.log(err)
            }
        }
        fetchJobData()
    },[])
    if(isLoading){
        return <Loading/>
    }

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
              await axios.patch(`${BASE_API_URL}/api/private/update-a-post/${id}`,parsedData.data)
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

export default UpdateAPost