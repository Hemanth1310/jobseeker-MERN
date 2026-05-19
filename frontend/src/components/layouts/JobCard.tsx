import React from 'react'
import type { jobDataType } from '../../utils/TypeChecker'

type Props = {
    jobPosting: jobDataType,
    children: React.ReactNode
}

const JobCard = ({jobPosting, children}: Props) => {
  return (
    <div className='flex flex-col  border-2 border-mist-200 p-10 rounded-lg '>
        <div>
            <h1>{jobPosting.title}</h1>
            <p>{jobPosting.companyName}</p>
        </div>
        {children}
        
    </div>
  )
}

export default JobCard