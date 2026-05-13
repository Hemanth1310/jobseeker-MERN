import React, { useEffect, useRef, useState } from 'react'
import Logo from '../ui/Logo'
import { useAuthContextData } from '../../utils/useAuthContextData'
import AuthLayout from './AuthLayout'
import { ChevronDown, ChevronUp, CircleUserRound, LogOut } from 'lucide-react'
import axios from '../../utils/authMiddleware'
import { NavLink } from 'react-router'

const BASE_API_URL = import.meta.env.VITE_API_URL

const HeaderLayout = () => {
  const {userData, logout} = useAuthContextData()
  const [isOpen, setIsOpen] = useState(false)
  const [isDropDownOpen, setIsDropDownOpen] = useState(false)
  const dropDownRef = useRef<HTMLDivElement>(null)
  const handleLogout=async()=>{
      try{
        await axios.get(`${BASE_API_URL}/api/private/logout`)
      }catch(err){
        console.log(err)
      }
    logout()
  }

  useEffect(()=>{
    const handleOutsideClick=(e:MouseEvent)=>{
      if(dropDownRef.current && !dropDownRef.current.contains(e.target as Node)){
        setIsDropDownOpen(false)
      }
    }
    document.addEventListener('mousedown',handleOutsideClick)
    
    return ()=>document.removeEventListener('mousedown',handleOutsideClick)
  },[])
  return (
    <div className='w-full  h-16 flex items-center justify-between pr-5 pl-5 font-mono'>
        <div className='h-8 flex gap-2 items-center'>
             <Logo/>
            <div className='text-xl'>
              Job/seeker
            </div>
        </div>
        <div>
          {userData?
            <div className='flex gap-5 items-center'>
                {userData.role==='EMPLOYER'?
                <div>
                  <NavLink to={'/admin/dashboard'} className={({isActive})=>`p-1 pl-5 pr-5 font-light text-sm hover:text-indigo-600 ${isActive && 'border-2 border-indigo-400 rounded-lg bg-indigo-200'}`}>
                    Openings
                  </NavLink>
                  <NavLink to='/admin/make-a-post' className={({isActive})=>`p-1 pl-5 pr-5 font-light text-sm hover:text-indigo-600  ${isActive && 'border-2 border-indigo-400 rounded-lg bg-indigo-100'}`}>
                    Make a post
                  </NavLink>

                </div>:<div>
                    <NavLink to={'/dashboard'} className={({isActive})=>`p-1 pl-5 pr-5 font-light text-sm hover:text-indigo-600 ${isActive && 'border-2 border-indigo-400 rounded-lg bg-indigo-200'}`}>
                      Dashboard
                    </NavLink>
                    <NavLink to='/applications' className={({isActive})=>`p-1 pl-5 pr-5 font-light text-sm hover:text-indigo-600  ${isActive && 'border-2 border-indigo-400 rounded-lg bg-indigo-100'}`}>
                      My Applications
                    </NavLink>
                  </div>}
                  <div ref={dropDownRef} className='relative flex items-center' onClick={(e)=>{e.stopPropagation();setIsDropDownOpen(prev=>!prev)}}>
                    <CircleUserRound size={28}/>
                    {isDropDownOpen?<ChevronUp size={18}/>:<ChevronDown size={18}/>}
                    {isDropDownOpen && <div className='absolute top-8 right-0 bg-mist-50 shadow-md border border-mist-200 p-5 rounded-lg flex flex-col'>
                       <button className='flex items-center text-red-500 hover:border-b-2 hover:border-b-brand-primary' onClick={handleLogout}>
                          <LogOut />
                          Logout
                        </button>
                    </div>}
                  </div>
                  
                  {/* */}
            </div>: <div>
                 <div>
              <button className='hover:border-b-2 hover:border-b-brand-primary' onClick={()=>setIsOpen(true)}>Login</button>
            </div>
            </div>
          }
            
            
        </div>
        <AuthLayout isOpen={isOpen} onClose={()=>setIsOpen(false)}/>
    </div>
  )
}

export default HeaderLayout