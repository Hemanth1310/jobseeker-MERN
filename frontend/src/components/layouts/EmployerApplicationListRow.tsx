import React, { useState } from 'react'
import type { candidateApplications } from '../../types';
import CoverLetterLayout from './CoverLetterLayout';
import ResumeLayout from './ResumeLayout';
import { Pencil } from 'lucide-react';
import EditStatusLayout from './EditStatusLayout';


const EmployerApplicationListRow = ({ application, updateStatus }:{application:candidateApplications, updateStatus:()=>void}) => {
  const [showResume, setShowResume] = useState(false);
  const startDate = new Date(application.EarliestStartDate)
  const [showCoverLetter, setShowCoverLetter] = useState(false);
  const [showEditStatus, setShowEditStatus] = useState(false)
    const statusColor={
  "PENDING":"gray",
  "REVIEWING": "amber",
  "ACCEPTED":"green",
  "REJECTED":"red"
}
    console.log(`font-bold text-${statusColor["REVIEWING"]}-500 `)
  return (
    <tr className="hover:bg-gray-50/70 transition-colors duration-150 align-top">
      {/* Application ID */}
      <td className="whitespace-nowrap px-6 py-4 font-mono text-xs text-gray-400">
        #{application.id.slice(0, 8)}...
      </td>

      <td className="px-6 py-4">
        <div className="font-semibold text-gray-900">{startDate.toDateString() || 'N/A'}</div>
      </td>

      {/* Residency */}
      <td className="whitespace-nowrap px-6 py-4 text-gray-500">
        {application.countryOfResidence}
      </td>

      {/* Work permit */}
      <td className="whitespace-nowrap px-6 py-4 text-gray-500">
        <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
          {application.ValidWorkPermit?'available':"Not Available"}
        </span>
      </td>
      {/* Work permit */}
      <td className="px-6 py-4 text-sm max-w-xs text-right ">
        <button className='font-bold' onClick={()=>setShowResume(true)}>Show</button>
      </td>

      {/* Cover Letter*/}
      <td className="px-6 py-4 text-sm max-w-xs text-right">
        <button className='font-bold' onClick={()=>setShowCoverLetter(true)}>Show</button>
      </td>
       <td className="px-6 py-4 text-sm max-w-xs text-right">
        <span onClick={()=>setShowEditStatus(true)} className={`font-bold cursor-pointer text-${statusColor[application.status]}-500 flex items-center justify-end gap-1`}>
          {application.status}
          <Pencil size={16} />
        </span>
      </td>

        <CoverLetterLayout isOpen={showCoverLetter} onClose={()=>setShowCoverLetter(false)} coverLetter={application.coverLetter}/ >
        <ResumeLayout isOpen={showResume} onClose={()=>setShowResume(false)} resumePath={application.resumePath}/>
        <EditStatusLayout isOpen={showEditStatus} onClose={()=>setShowEditStatus(false)} updateStatus={updateStatus} status={application.status} appId={application.id}/>   
    </tr>
  );
};

export default EmployerApplicationListRow