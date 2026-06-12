import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import type { candidateApplications } from '../../types'
import Loading from '../../components/layouts/Loading'
import axios from "../../utils/authMiddleware";
import { isAxiosError } from 'axios';
import EmployerApplicationListRow from '../../components/layouts/EmployerApplicationListRow';

const BASE_API_URL = import.meta.env.VITE_API_URL;
const JobApplications = () => {
    const {id} = useParams()
    const [isLoading, setIsLoading] = useState(false)
    const [hasError, setHasError] = useState(false)
    const [hasStatusChanged, setHasStatusChanged] = useState(false)
    const [applications, setApplications] = useState<candidateApplications[]|null>(null)


    const updateStatus = ()=>{
        setHasStatusChanged(true)
    }

    useEffect(()=>{
        const fetchApplicaitons=async()=>{
            setIsLoading(true)

            try{
                const {data} = await axios.get(`${BASE_API_URL}/api/private/employer/applications/${id}`)
                setApplications(data.payload as candidateApplications[])
            }catch(err){
                if(isAxiosError(err)){
                    console.log(err.response?.data.error)
                }else{
                    console.log("Unexpected Error Occured")
                }
                setHasError(true)
            }finally{
                setIsLoading(false)
                
            }
        }
        fetchApplicaitons()
    },[id])
    if(isLoading){
            return <Loading/>
        }

    if (hasError || !applications) {
            return <div className="p-5 text-red-500 font-medium">Failed to load applications. Please try again later.</div>
        }

  return (
    <div className="w-full h-full ">
      <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Applications</h1>
      {applications.length > 0 && (
            <div className="mb-6 flex flex-wrap items-center gap-4 bg-white p-4 rounded-xl border border-gray-200 shadow-sm mt-5">
                <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Current View:</span>
                    <span className="inline-flex items-center rounded-md bg-blue-50 px-2.5 py-1 text-sm font-semibold text-blue-700 ring-1 ring-inset ring-blue-700/10">
                    {applications[0].job.title}
                    </span>
                </div>
                <div className="hidden sm:block text-gray-300">|</div>
                <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-500">at</span>
                    <span className="text-sm font-bold text-gray-800 bg-gray-100 px-2.5 py-1 rounded-md">
                    {applications[0].job.companyName}
                    </span>
                </div>
            </div>
        )}
      <div className="mt-5 ">
             {applications.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50">
          <p className="text-gray-500 font-medium">There are no applications yet.</p>
        </div>
      ) : (
        <div className="w-full overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
          <table className="w-full table-auto border-collapse text-left text-sm">
            <thead className="bg-gray-50 border-b border-gray-200 text-xs font-semibold uppercase tracking-wider text-gray-600">
              <tr>
                <th scope="col" className="px-6 py-4">Application ID</th>
                <th scope="col" className="px-6 py-4">EarliestStartDate</th>
                <th scope="col" className="px-6 py-4">Country Of Residence</th>
                <th scope="col" className="px-6 py-4">Valid Work permit</th>
                <th scope="col" className="px-6 py-4 text-right">Resume</th>
                <th scope="col" className="px-6 py-4 text-right">CoverLetter</th>
                <th scope="col" className="px-6 py-4 text-right">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
              {applications.map((application) => (
                /* ✅ Render the sub-component here */
                <EmployerApplicationListRow key={application.id} application={application} hasStatusChanged={hasStatusChanged} updateStatus={updateStatus}/>
              ))}
            </tbody>
          </table>
        </div>
      )}
      </div>
    </div>
  )
}

export default JobApplications