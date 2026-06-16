import { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router'
import axios from "../../utils/authMiddleware";
import { applicationSchema, candidateJobPostSchema, type cadidateJobPostType } from '../../utils/TypeChecker';
import { Activity, ChartBarStacked, Coins, FlagTriangleRightIcon } from 'lucide-react';
import { isAxiosError } from 'axios';
import { toast } from 'react-toastify';
import Loading from '../../components/layouts/Loading';
const BASE_API_URL = import.meta.env.VITE_API_URL;

const JobApplication = () => {
    const {id} = useParams()
    const [jobPost,setJobPost] = useState<cadidateJobPostType>()
    const [isLoading, setIsLoading] = useState(true);
    const [applicationDetails, setApplicationDetails] = useState({
        coverLetter: "",
        countryOfResidence: "",
        ValidWorkPermit: false,
        EarliestStartDate:"",
    })
    const [file, setFile] = useState<File|null>(null)
    const [errors, setErrors] = useState({
        coverLetter: "",
        countryOfResidence: "",
        ValidWorkPermit: "",
        EarliestStartDate:"",
        files:"",
        apiResponse:""
    })
    const [isPending, setIsPending] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    useEffect(()=>{
        setIsLoading(true)
        const fetchJobPostById = async()=>{
            try{
                  const { data } = await axios.get(
                    `${BASE_API_URL}/api/private/candidate/jobPosting/${id}`,
                    );
                    const parsedData = candidateJobPostSchema.safeParse(data.payload)

                    if(!parsedData.success){
                        console.log("Failed To Fetch.")
                        return <Navigate to='/dashboard'/>
                    }

                    setJobPost(parsedData.data)
            }catch{
                console.log("Failed to Fetch details")
            }
        }
        fetchJobPostById()
        setIsLoading(false)
    },[])

    const handleChange=(e:React.ChangeEvent<HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement>)=>{
        const {name, value} = e.target
        if(name==='ValidWorkPermit'){
            setApplicationDetails(prev=>({...prev,[name]:value==="0"?false:true}))
        }else{
            setApplicationDetails(prev=>({...prev,[name]:value}))
        }
        
    }
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit=async(e:React.FormEvent)=>{
        e.preventDefault()
        setIsSubmitted(false)
            setErrors({
                coverLetter: "",
                countryOfResidence: "",
                ValidWorkPermit: "",
                EarliestStartDate:"",
                files:"",
                apiResponse:""
            })
        setIsPending(true)
            if(!file){
                setErrors(prev=>({...prev,files:"Please upload a resume."}))
                setIsPending(false);
                return
            }

            const parsedData = applicationSchema.safeParse(applicationDetails)

            if(!parsedData.success){
                for(const issue of parsedData.error.issues){
                    setErrors(prev=>({...prev,[issue.path[0]]:issue.message}))
                }
                setIsPending(false);
                return
            }

            const formData = new FormData()

            formData.append('coverLetter',applicationDetails.coverLetter)
            formData.append('countryOfResidence',applicationDetails.countryOfResidence)
            formData.append('ValidWorkPermit',String(applicationDetails.ValidWorkPermit))
            formData.append('EarliestStartDate',applicationDetails.EarliestStartDate)
            formData.append('file',file)
            try{
                await axios.post(`${BASE_API_URL}/api/private/candidate/apply/${id}`, formData,{
                    headers:{
                        "Content-Type":"multipart/form-data"
                    }
                })
                 toast.success('Application submitted successfully',{
                                                           position: "top-right",
                                                           autoClose: 5000,
                                                           hideProgressBar: false,
                                                           closeOnClick: false,
                                                           pauseOnHover: true,
                                                           draggable: true,
                                                           progress: undefined,
                                                           theme: "light",
                                                   })
                setIsSubmitted(true)
            } catch(err){
                if(isAxiosError(err)){
                    console.log(err.response?.data?.error)
                    setErrors(prev=>({...prev,apiResponse:err.response?.data?.error}))
                }else{
                     setErrors(prev=>({...prev,apiResponse:"Unexpected error occured. Server Failure."}))
                }
               
                 toast.error('Applcation Failed',{
                                                            position: "top-right",
                                                            autoClose: 5000,
                                                            hideProgressBar: false,
                                                            closeOnClick: false,
                                                            pauseOnHover: true,
                                                            draggable: true,
                                                            progress: undefined,
                                                            theme: "light",
                                        })
            }finally{
                setIsPending(false)
            }
            
    }

    if(isLoading){
        return <Loading/>
    }
  return (
    <div className='w-full h-full flex flex-col gap-1'>
        <h1 className='text-2xl'>{jobPost?.title}</h1>
        <h2 className='text-mist-500 text-sm'>{jobPost?.companyName}</h2>
        <h2 className='text-mist-500 text-sm'>{jobPost?.location}</h2>
        <div className='flex flex-col sm:flex-row gap-10 mt-5'>
            <div className='flex-1 flex flex-col gap-5'>
                <div className='flex gap-10 flex-wrap'>
                    <p className='flex items-center gap-2'><Activity  size={18}/>{jobPost?.experience}</p>
                    <p className='flex items-center gap-2'><ChartBarStacked size={18}/>{jobPost?.category}</p>
                    <p className='flex items-center gap-2'><FlagTriangleRightIcon size={18}/>{jobPost?.jobType}</p>
                    <p className='flex items-center gap-2'><Coins size={18}/>{jobPost?.salary}</p>
                </div>
                <p className='mt-5 text-justify'>{jobPost?.description}</p>
            </div>
            {isSubmitted?<div className='flex-1  h-full flex flex-col items-center gap-5'>
                <p className='border border-green-600 bg-green-100 p-5 rounded-lg'>Thank you for your application. We are pleased that you are interested in a postion at {jobPost?.companyName}. Please allow us some time to review your application. We will get back to you as soon as possible!</p>
                </div>:

                <form onSubmit={handleSubmit} className='flex-1 h-full flex flex-col gap-5'>
               <div className='w-full flex flex-col gap-1'>
                        <label className='w-full border-2 flex flex-col items-center rounded-lg border-brand-secondary bg-indigo-50 text-lg p-4 cursor-pointer hover:bg-indigo-100 transition-colors overflow-scroll'>
                            <span>Drop Resume (PDF/Doc)</span>
                            {/* File value binding removed; using specialized handleFileChange */}
                            <input 
                                type='file' 
                                className='mt-2 text-xs sm:text-sm' 
                                accept=".pdf,.doc,.docx"
                                onChange={handleFileChange} 
                            />
                        </label>
                        {file && <p className='text-xs text-green-600 font-medium'>Selected: {file.name}</p>}
                        {errors.files && <p className='text-sm text-red-500'>{errors.files}</p>}
                    </div>
            
                 <div className='w-full flex flex-col gap-1'>
                    <label >Cover Letter:</label>
                    <textarea name='coverLetter' className='w-full h-full border-2 rounded-lg border-mist-200 text-lg p-1 pl-3' value={applicationDetails.coverLetter} onChange={handleChange}></textarea>
                    {errors.coverLetter && <p className='text-sm text-red-500'>{errors.coverLetter}</p>}
                </div>
                <div className='w-full flex flex-col gap-1'>
                    <label >countryOfResidence:</label>
                    <input type='text' name='countryOfResidence' className='w-full border-2 rounded-lg border-mist-200 text-lg p-1 pl-3' value={applicationDetails.countryOfResidence} onChange={handleChange}></input>
                    {errors.countryOfResidence && <p className='text-sm text-red-500'>{errors.countryOfResidence}</p>}
                </div>
                <div className='w-full flex flex-col gap-1'>
                    <label >EarliestStartDate:</label>
                    <input type='date' name='EarliestStartDate' className='w-full border-2 rounded-lg border-mist-200 text-lg p-1 pl-3' value={applicationDetails.EarliestStartDate} onChange={handleChange}></input>
                    {errors.EarliestStartDate && <p className='text-sm text-red-500'>{errors.EarliestStartDate}</p>}
                </div>
                <div className='w-full flex flex-col gap-1'>
                    <label >Valid Work permit:</label>
                     <select name='ValidWorkPermit' className='w-full border-2 rounded-lg border-mist-200 text-lg p-1 pl-3' value={applicationDetails.ValidWorkPermit?'True':'False'} onChange={handleChange}>
                        <option value="" className='text-mist-400' disabled>Select Ture/False</option>
                        <option key={'false'} value={0} >False</option>
                        <option key={'true'} value={1}>True</option>
                    </select>
                        
                    {errors.ValidWorkPermit && <p className='text-sm text-red-500'>{errors.EarliestStartDate}</p>}
                </div> 
               {errors.apiResponse && <p className='text-xs text-red-500'>Failed to submit application: {errors.apiResponse}</p>}
                <div className='w-full flex justify-end'>
                    <button type='submit' disabled={isPending} className=' bg-brand-primary text-white w-1/3 p-2 rounded-lg disabled:cursor-not-allowed disabled:bg-mist-400'>{isPending?'In progress':'Submit'}</button>
                </div>
            
        </form>
}
        </div>
       

    </div>
  )
}

export default JobApplication