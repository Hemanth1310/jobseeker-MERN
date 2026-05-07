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
        return
    }
    const modalRoot  = document.getElementById("modalRoot")!
    const modalContent = (
        <div className='absolute inset-0 w-screen h-screen bg-gray-500/50 flex items-center justify-center'>
            <div className='w-1/3 h-1/3 bg-white p-10'>
                <div>
                    <h1>{title}</h1>
                    <button onClick={onClose}>X</button>
                </div>
                
                <div className='h-1 w-full bg-mist-400'></div>
                <div>
                    {children}
                </div>
            </div>
        </div>
    )
  return createPortal(modalContent,modalRoot)
}

export default Modal