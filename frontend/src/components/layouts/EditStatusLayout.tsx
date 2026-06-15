import React, { useState } from 'react'
import Modal from './Modal'
import axios from '../../utils/authMiddleware'
import { toast } from 'react-toastify'

type Props = {
    isOpen: boolean,
    onClose:()=>void,
    updateStatus:()=>void,
    appId:string,
    status:string
}

const BASE_API_URL = import.meta.env.VITE_API_URL;


const EditStatusLayout = ({isOpen, onClose, updateStatus, status, appId}: Props) => {

    const [curStatus, setCurStatus] = useState(status)
    const [feedback, setFeedback] = useState('')
    const handleChange=async(e:React.ChangeEvent<HTMLSelectElement>)=>{
        const newStatus= e.target.value
        setCurStatus(newStatus)
    }

    const submitStatus =async ()=>{
         if(status!==curStatus){  
            try{
                await axios.patch(`${BASE_API_URL}/api/private/employer/updateStatus/${appId}/${curStatus}`, {feedback})
                
                 toast.success('Status Updated Successful',{
                                                                   position: "top-right",
                                                                   autoClose: 5000,
                                                                   hideProgressBar: false,
                                                                   closeOnClick: false,
                                                                   pauseOnHover: true,
                                                                   draggable: true,
                                                                   progress: undefined,
                                                                   theme: "light",
                                                           })
                onClose()
                updateStatus()
                
            }catch{
             toast.error('Status update Failed',{
                                                                        position: "top-right",
                                                                        autoClose: 5000,
                                                                        hideProgressBar: false,
                                                                        closeOnClick: false,
                                                                        pauseOnHover: true,
                                                                        draggable: true,
                                                                        progress: undefined,
                                                                        theme: "light",
                                                    })
        }

        }
    }

  return (
    <Modal onClose={onClose} isOpen={isOpen} title={"Cover Letter"}>
        <div className='p-5 whitespace-pre-wrap w-full max-h-full overflow-y-hidden'>
            <div className='w-full flex items-center gap-1'>
                    <label >Status:</label>
                    <select name='role' className='border-2 rounded-lg border-mist-200 text-lg p-1 pl-3' value={curStatus} onChange={handleChange}>
                        <option value="PENDING">PENDING</option>
                        <option value="REVIEWING">REVIEWING</option>
                        <option value="ACCEPTED">ACCEPTED</option>
                        <option value="REJECTED">REJECTED</option>

                    </select>
            </div>
             <div className='w-full flex flex-col gap-1'>
                    <label >Feedback:</label>
                    <textarea 
                        name='coverLetter' 
                        className='w-full min-h-30 border border-gray-300 rounded-lg text-base p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none' 
                        value={feedback} 
                        onChange={(e) => setFeedback(e.target.value)}
                        placeholder="Add internal feedback notes here..."
                    />
                </div>
            <button className='w-full mt-5 h-10 p-1 bg-brand-primary rounded-lg text-white' onClick={submitStatus}>Submit</button>

        </div>
    </Modal>
  )
}

export default EditStatusLayout