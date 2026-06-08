import React, { useEffect, useState } from 'react'
import axios from '../../utils/authMiddleware'
import { arrayjobPostingSchema, type JobPostType } from '../../utils/TypeChecker'
import { AxiosError } from 'axios'
import Loading from '../../components/layouts/Loading'
import JobCard from '../../components/layouts/JobCard'
import { toast } from 'react-toastify'
import { Edit } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
const BASE_API_URL = import.meta.env.VITE_API_URL

const EmployerDashboard = () => {
  const [jobPosts, setJobPosts] = useState<JobPostType[]|null>(null) 
  const [isLoading, setIsLoading] = useState(true)

      const navigate = useNavigate()
    const handleNavigation = (id:string)=>{
        navigate(`/employer/update-a-post/${id}`)
    }
    const handleApplicationsView = (id:string)=>{
       navigate(`/employer/applications/${id}`)
    }

  useEffect(() => {
    const fetchJobPosts = async () => {
      try {
        const { data } = await axios.get(`${BASE_API_URL}/api/private/employer/jobPostings`)
        const parsedData = arrayjobPostingSchema.safeParse(data.payload)

        if (!parsedData.success) {
          console.error("Validation Failed: Invalid data recieved")
          setJobPosts([])
          return
        }
        setJobPosts(parsedData.data) 
        
      } catch (err) {
        if (err instanceof AxiosError) {
          console.log(err.message)
        }
        setJobPosts(null)
      } finally {
        setIsLoading(false)
      }
    }
    fetchJobPosts()
  }, [])

  if (isLoading) return <Loading />
  if (jobPosts === null) return <div>Failed to load resources</div>
  if (jobPosts.length === 0) return <div>No job postings found.</div>
  
  const handleStatus = async(e:React.ChangeEvent<HTMLSelectElement>,postId:string)=>{
    const status = e.target.value==='true'?true:false
    setJobPosts((prev)=>prev!.map(post=>post.id===postId?{...post,isActive:status}:post))
    try{
        await axios.patch(`${BASE_API_URL}/api/private/updateJobStatus/${postId}?status=${status}`)
         toast.success('Status Updated Successful',{
                                                   position: "top-right",
                                                   autoClose: 5000,
                                                   hideProgressBar: false,
                                                   closeOnClick: false,
                                                   pauseOnHover: true,
                                                   draggable: true,
                                                   progress: undefined,
                                                   theme: "light",
                                           })

    } catch (err) {
        if (err instanceof AxiosError) {
          console.log(err.response?.data.error)
        }
        setJobPosts((prev)=>prev!.map(post=>post.id===postId?{...post,isActive:!status}:post))
        toast.error('Status update Failed',{
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
    <div className='w-full h-full '>
        <h1 className='text-2xl'>Dashboard</h1>
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-5 mt-5 '>
            {jobPosts?.map((post)=>(<JobCard key={post.id}>
                      <div className='flex justify-between'>
            <div className='flex flex-col gap-2'>
                <h1 className='text-xl font-semibold'>{post.title}</h1>
                <p className='text-mist-500 text-sm'>{post.companyName}</p>
            </div>
            <div>
                <Edit size={28} onClick={()=>handleNavigation(post.id)}/>
            </div>
        </div>
        <div className="flex items-center mt-5 justify-between">
              <div className="flex items-center gap-1">
                <label >Role:</label>
                  <select name='role' className='border-2 rounded-lg border-mist-200 text-lg p-1 pl-3' value={post.isActive+''} onChange={(e)=>handleStatus(e,post.id)}>
                      <option value="true">Active</option>
                      <option value="false">Closed</option>
                  </select>
              </div>
                <div className='flex'>
                  <button className="bg-brand-primary hover:bg-brand-secondary text-white text-sm p-2 rounded-lg" onClick={()=>handleApplicationsView(post.id)}>View Applications</button>
                </div>
            </div>
          
          </JobCard>))}
          
          
          
        </div>
        
    </div>
  )
}

export default EmployerDashboard