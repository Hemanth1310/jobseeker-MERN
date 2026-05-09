import React from 'react'
import { createPortal } from 'react-dom'

type Props = {
    isOpen:boolean,
    title:string,
    children:React.ReactNode,
    onClose:()=>void
}

const Modal = ({isOpen,title,children,onClose}: Props) => {
    if(!isOpen){
        return null
    }
    const modalRoot  = document.getElementById("modalRoot")!
    const modalContent = (
        <div className='fixed inset-0 w-screen h-screen bg-gray-500/50 flex items-center justify-center z-100 font-mono'>
            <div className='bg-mist-50 min-w-1/3 min-h-1/3  p-5 rounded-lg'>
                <div className='flex items-center justify-between pb-3'>
                    <h1 className='text-2xl'>{title}</h1>
                    <button onClick={onClose}>X</button>
                </div>
                
                <div className='h-0.5 w-full bg-mist-200'></div>
                <div>
                    {children}
                </div>
            </div>
        </div>
    )
  return createPortal(modalContent,modalRoot)
}

export default Modal