import React, { useState } from 'react';
import type { candidateApplications } from '../../types';

// Isolated sub-component for the table row to hold individual toggle states
const ApplicationRow = ({ application }:{application:candidateApplications}) => {
  const [showFeedback, setShowFeedback] = useState(false);

  return (
    <tr className="hover:bg-gray-50/70 transition-colors duration-150 align-top">
      {/* Application ID */}
      <td className="whitespace-nowrap px-6 py-4 font-mono text-xs text-gray-400">
        #{application.id.slice(0, 8)}...
      </td>

      {/* Job Title */}
      <td className="px-6 py-4">
        <div className="font-semibold text-gray-900">{application.job?.title || 'N/A'}</div>
      </td>

      {/* Company Name */}
      <td className="whitespace-nowrap px-6 py-4 text-gray-500">
        {application.job?.companyName || "Company Inc."}
      </td>

      {/* Status */}
      <td className="whitespace-nowrap px-6 py-4 text-gray-500">
        <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
          {application.status}
        </span>
      </td>

      {/* Feedback Column (With Expand Toggle) */}
      <td className="px-6 py-4 text-sm max-w-xs text-right">
        {application.feedback ? (
          <div className="flex flex-col items-end gap-1">
            {showFeedback ? (
              <div className="text-left bg-gray-50 border border-gray-100 rounded-lg p-3 text-xs text-gray-600 break-all max-w-[250px] md:max-w-xs">
                {application.feedback}
                <button 
                  onClick={() => setShowFeedback(false)}
                  className="block mt-2 font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
                >
                  Hide
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setShowFeedback(true)}
                title="View Feedback"
                className="inline-flex items-center justify-center px-2 py-0.5 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold tracking-widest text-xs transition-colors"
              >
                 {application.feedback.substring(0,18)}...
              </button>
            )}
          </div>
        ) : (
          <span className="text-gray-400 italic text-xs">No feedback yet</span>
        )}
      </td>
    </tr>
  );
};

export default ApplicationRow