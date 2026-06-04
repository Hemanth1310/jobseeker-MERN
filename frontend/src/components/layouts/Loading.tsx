import { Loader } from 'lucide-react'
import React from 'react'

const Loading = () => {
  return (
    <div className='w-full h-full flex items-center justify-center'>
      <Loader className="animate-spin [animation-duration:4s] text-brand-primary" />
      Loading
    </div>
  )
}

export default Loading