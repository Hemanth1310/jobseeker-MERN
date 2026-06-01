import React, { useEffect, useState } from 'react'
import JobCard from '../../components/layouts/JobCard'
import axios from '../../utils/authMiddleware'
import { arrayjobPostingSchema, jobPostSchema, type JobPostType } from '../../utils/TypeChecker'
import { AxiosError } from 'axios'
import Loading from '../../components/layouts/Loading'

const BASE_API_URL = import.meta.env.VITE_API_URL
const CandidateDashboard = () => {
  const [jobPosts, setJobPosts] = useState<JobPostType[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(()=>{
      const fetchJobPosts =async()=>{
          try{
            const {data} =await axios.get(`${BASE_API_URL}/api/private/candidate/jobPostings`)
            const parsedData = arrayjobPostingSchema.safeParse(data.payload)
              if (!parsedData.success) {
                console.error("Validation Failed: Invalid data recieved")
                setJobPosts([])
                return
              }
              setJobPosts(parsedData.data) 
          }catch (err) {
            if (err instanceof AxiosError) {
                    console.log(err.message)
              }
              setJobPosts([])
          } 
          finally {
              setIsLoading(false)
          }
      }

      fetchJobPosts()
  },[])

   if (isLoading) return <Loading />
  if (jobPosts === null) return <div>Failed to load resources</div>
  if (jobPosts.length === 0) return <div>No job postings found.</div>

  return (
        <div className='w-full h-full '>
        <h1 className='text-2xl'>Dashboard</h1>
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-5 mt-5 '>
            {jobPosts?.map((post)=>(<JobCard jobPosting={post} key={post.id}>
            <div className='flex items-center '>
              <div className='w-full flex items-center gap-1'>
                  {/* <label >Role:</label>
                  <select name='role' className='border-2 rounded-lg border-mist-200 text-lg p-1 pl-3' value={post.isActive+''} onChange={(e)=>handleStatus(e,post.id)}>
                      <option value="true">Active</option>
                      <option value="false">Closed</option>
                  </select> */}
                  <button></button>
              </div>
            </div>
          </JobCard>))}
          
        </div>
        
    </div>
  )
}

export default CandidateDashboard