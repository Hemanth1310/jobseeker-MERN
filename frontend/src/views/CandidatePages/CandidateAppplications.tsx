import React, { useEffect, useState } from 'react'
import type { candidateApplications } from '../../types'
import axios from "../../utils/authMiddleware";
import { AxiosError } from 'axios';
import Loading from '../../components/layouts/Loading';
const BASE_API_URL = import.meta.env.VITE_API_URL;
const CandidateAppplications = () => {
    const [myApplications, setMyApplications] = useState<candidateApplications[]|null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [hasError, setHasError] = useState(false)
    useEffect(()=>{

        const fetchApplications = async() => {
            setIsLoading(true)
           try {
                const { data } = await axios.get(
                `${BASE_API_URL}/api/private/candidate/my-applications`,
                );
                
                const applicationsArray = data.payload || data; 
                
                if (Array.isArray(applicationsArray)) {
                    setMyApplications(applicationsArray);
                } else {
                    console.error("Expected an array but received:", applicationsArray);
                    setHasError(true);
                }
            } catch (err) {
                if (err instanceof AxiosError) {
                     console.log(err.message);
                }
                setMyApplications(null);
            } finally {
                setIsLoading(false);
            }
        }

        fetchApplications()
    },[])

    if(isLoading){
        return <Loading/>
    }

  if (hasError || !myApplications) {
        return <div className="p-5 text-red-500 font-medium">Failed to load applications. Please try again later.</div>
    }

  return (
     <div className="w-full h-full ">
      <h1 className="text-2xl">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-5 ">
        {myApplications.map((application)=><div key={application.id}>
            <p>{application.id}</p>
            <p>{application.job.title}</p>

        </div>)}
      </div>
    </div>
  )
}

export default CandidateAppplications