import React from 'react'
import type { JobFormErrors, JobFormState } from '../../types'

type Props = {
    jobData:JobFormState,
    setJobData:React.Dispatch<React.SetStateAction<JobFormState>>,
    errors:JobFormErrors,
    handleSubmit:()=>void,
    isPending:boolean
}

const JobPostForm = ({jobData,setJobData,errors,handleSubmit, isPending}: Props) => {

      const jobType= ["Fulltime" , "Internship" , "Freelance"] as const
        const experience=[ "Experienced" , "Intermediate" , "Begginer"] as const
        const category= ["Software" , "Design" , "Sales" , "Marketing" , "Finance"] as const
    
    
        const handleChange = (e:React.ChangeEvent<HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement>)=>{
            const {name, value} = e.target
    
            setJobData(prev=>({...prev,[name]:value}))
        }


  return (
    <form action={handleSubmit} className='h-full flex flex-col sm:flex-row gap-5'>
            
            <div className='flex-1 h-full flex flex-col justify-between'>
                 <div className='w-full flex flex-col gap-1'>
                    <label >Title:</label>
                    <input type='text' name='title' className='w-full border-2 rounded-lg border-mist-200 text-lg p-1 pl-3' value={jobData.title} onChange={handleChange}></input>
                    {errors.title && <p className='text-sm text-red-500'>{errors.title}</p>}
                </div>
                <div className='w-full flex flex-col gap-1'>
                    <label >Company Name:</label>
                    <input type='text' name='companyName' className='w-full border-2 rounded-lg border-mist-200 text-lg p-1 pl-3' value={jobData.companyName} onChange={handleChange}></input>
                    {errors.companyName && <p className='text-sm text-red-500'>{errors.companyName}</p>}
                </div>
                <div className='w-full flex flex-col gap-1'>
                    <label >Location:</label>
                    <input type='text' name='location' className='w-full border-2 rounded-lg border-mist-200 text-lg p-1 pl-3' value={jobData.location} onChange={handleChange}></input>
                    {errors.location && <p className='text-sm text-red-500'>{errors.location}</p>}
                </div>
                <div className='flex justify-between gap-5'>
                        <div className='w-full flex flex-col gap-1'>
                            <label >Job Type:</label>
                            <select name='jobType' className='w-full border-2 rounded-lg border-mist-200 text-lg p-1 pl-3' value={jobData.jobType} onChange={handleChange}>
                            <option value="" disabled>Select Job Type</option>
                            {jobType.map((opt, index)=><option key={index} value={opt}>{opt}</option>)}
                            </select>
                            {errors.jobType && <p className='text-sm text-red-500'>{errors.jobType}</p>}
                        </div>
                        <div className='w-full flex flex-col gap-1'>
                            <label >Experience:</label>
                            <select name='experience' className='w-full border-2 rounded-lg border-mist-200 text-lg p-1 pl-3' value={jobData.experience} onChange={handleChange}>
                            <option value="" disabled>Select Experience</option>
                            {experience.map((opt, index)=><option key={index} value={opt}>{opt}</option>)}
                            </select>
                            {errors.experience && <p className='text-sm text-red-500'>{errors.experience}</p>}
                        </div>
                       
                </div>
                <div className='flex justify-between gap-5'>
                     <div className='w-full flex flex-col gap-1'>
                            <label >Category:</label>
                            <select name='category' className='w-full border-2 rounded-lg border-mist-200 text-lg p-1 pl-3' value={jobData.category} onChange={handleChange}>
                             <option value="" className='text-mist-400' disabled>Select Category</option>
                            {category.map((opt, index)=><option key={index} value={opt}>{opt}</option>)}
                            </select>
                            {errors.category && <p className='text-sm text-red-500'>{errors.category}</p>}
                        </div>
                   
                </div>
                  <div className='w-full flex flex-col gap-1'>
                        <label >Salary:</label>
                        <input type='text' name='salary' className='w-full border-2 rounded-lg border-mist-200 text-lg p-1 pl-3' value={jobData.salary} onChange={handleChange}></input>
                        {errors.salary && <p className='text-sm text-red-500'>{errors.salary}</p>}
                    </div>
               
                

            </div>
            <div className='flex-1 h-full flex flex-col gap-5'>
                  <div className='w-full h-full flex flex-col gap-1'>
                        <label >Description:</label>
                        <textarea className='w-full h-full border-2 rounded-lg border-mist-200 text-lg p-1 pl-3' name='description' value={jobData.description} onChange={handleChange}></textarea>
                         {errors.description && <p className='text-sm text-red-500'>{errors.description}</p>}
                    </div>
                
                {errors.apiResponse && <p className='text-xs text-red-500'>Registration Failed: {errors.apiResponse}</p>}
                <div className='w-full flex justify-end'>
                    <button type='submit' className=' bg-brand-primary text-white w-1/3 p-2 rounded-lg'>{isPending?'In progress':'Submit'}</button>
                </div>
            </div>
            
        </form>
  )
}

export default JobPostForm