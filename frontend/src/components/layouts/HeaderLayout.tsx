import React, { useState } from 'react'
import Logo from '../ui/Logo'
import { useAuthContextData } from '../../utils/useAuthContextData'
import AuthLayout from './AuthLayout'


const HeaderLayout = () => {
  const {userData} = useAuthContextData()
  const [isOpen, setIsOpen] = useState(false)
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
            <div>

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