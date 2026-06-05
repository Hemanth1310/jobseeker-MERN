import React, { useEffect, useState } from 'react'
import type { candidateApplications } from '../../types'
import axios from "../../utils/authMiddleware";
import { AxiosError } from 'axios';
import Loading from '../../components/layouts/Loading';
import ApplicationRow from '../../components/layouts/ApplicationRow';
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
      <h1 className="text-2xl font-bold text-gray-900 tracking-tight">My applications</h1>
      <div className="mt-5 ">
             {myApplications.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50">
          <p className="text-gray-500 font-medium">You haven't submitted any applications yet.</p>
        </div>
      ) : (
        <div className="w-full overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
          <table className="w-full table-auto border-collapse text-left text-sm">
            <thead className="bg-gray-50 border-b border-gray-200 text-xs font-semibold uppercase tracking-wider text-gray-600">
              <tr>
                <th scope="col" className="px-6 py-4">Application ID</th>
                <th scope="col" className="px-6 py-4">Job Title</th>
                <th scope="col" className="px-6 py-4">Company</th>
                <th scope="col" className="px-6 py-4">Status</th>
                <th scope="col" className="px-6 py-4 text-right">Feedback</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
              {myApplications.map((application) => (
                /* ✅ Render the sub-component here */
                <ApplicationRow key={application.id} application={application} />
              ))}
            </tbody>
          </table>
        </div>
      )}
      </div>
    </div>
  )
}

export default CandidateAppplications