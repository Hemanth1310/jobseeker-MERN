import React, { useEffect, useState } from 'react'
import type { JobPostings } from '../../types'
import axios from '../../utils/authMiddleware'
import { arrayjobPostingSchema, jobPostingSchema } from '../../utils/TypeChecker'
import { AxiosError } from 'axios'
import Loading from '../../components/layouts/Loading'

const BASE_API_URL = import.meta.env.VITE_API_URL

const EmployerDashboard = () => {
  const [jobPostings, setJobPostings] = useState<JobPostings[]|null>(null) 
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchJobPostings = async () => {
      try {
        const { data } = await axios.get(`${BASE_API_URL}/api/private/employer/jobPostings`)
        const parsedData = arrayjobPostingSchema.safeParse(data.payload)

        if (!parsedData.success) {
          console.error("Validation Failed:", parsedData.error.format())
          setJobPostings([])
          return
        }
        setJobPostings(parsedData.data) 
        
      } catch (err) {
        if (err instanceof AxiosError) {
          console.log(err.message)
        }
        setJobPostings(null)
      } finally {
        setIsLoading(false)
      }
    }
    fetchJobPostings()
  }, [])

 if (isLoading) return <Loading />
  if (jobPostings === null) return <div>Failed to load resources</div>
  if (jobPostings.length === 0) return <div>No job postings found.</div>
  
  
  return (
    <div className='w-full h-full '>
        <h1 className='text-2xl'>Dashboard</h1>
        {jobPostings?.map((post)=>(<div>
          {post.title}
        </div>))}
    </div>
  )
}

export default EmployerDashboard