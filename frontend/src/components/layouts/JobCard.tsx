import React from 'react'
import type { jobDataType } from '../../utils/TypeChecker'
import { Edit } from 'lucide-react'

type Props = {
    jobPosting: jobDataType,
    children: React.ReactNode
}

const JobCard = ({jobPosting, children}: Props) => {
  return (
    <div className='flex flex-col justify-between border-2 border-mist-200 p-5 rounded-lg '>
        <div className='flex justify-between'>
            <div className='flex flex-col gap-2'>
                <h1 className='text-xl font-semibold'>{jobPosting.title}</h1>
                <p className='text-mist-500 text-sm'>{jobPosting.companyName}</p>
            </div>
            <div>
                <Edit size={28}/>
            </div>
        </div>
        {children}
        
    </div>
  )
}

export default JobCard