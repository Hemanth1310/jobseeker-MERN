import React, { useState } from 'react'
import type { candidateApplications } from '../../types';
import CoverLetterLayout from './CoverLetterLayout';
import ResumeLayout from './ResumeLayout';


const EmployerApplicationListRow = ({ application }:{application:candidateApplications}) => {
  const [showResume, setShowResume] = useState(false);
  const startDate = new Date(application.EarliestStartDate)
  const [showCoverLetter, setShowCoverLetter] = useState(false);

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
      <td className="px-6 py-4 text-sm max-w-xs text-right">
        <button className='font-bold' onClick={()=>setShowResume(true)}>Show</button>
      </td>

      {/* Cover Letter*/}
      <td className="px-6 py-4 text-sm max-w-xs text-right">
        <button className='font-bold' onClick={()=>setShowCoverLetter(true)}>Show</button>
      </td>

      <CoverLetterLayout isOpen={showCoverLetter} onClose={()=>setShowCoverLetter(false)} coverLetter={application.coverLetter}/ >
        <ResumeLayout isOpen={showResume} onClose={()=>setShowResume(false)} resumePath={application.resumePath}/>
    </tr>
  );
};

export default EmployerApplicationListRow