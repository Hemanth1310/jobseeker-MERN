import React, { useState } from 'react'
import Modal from './Modal'
import Login from './Login'
import Register from './Register'

type Props = {
    isOpen: boolean,
    onClose:()=>void
}

type toggeler = "login"|"Register"

const AuthLayout = ({isOpen, onClose}: Props) => {

   const [toggle,setToggle] = useState<toggeler>('login')
   
   const title = toggle==='login'?'Login':'Register'
   const ActiveComponent = toggle==='login'? Login:Register

   const toggelTo =(val:toggeler)=>{
        setToggle(val)
   }
  return (
    <Modal onClose={onClose} isOpen={isOpen} title={title}>
        <ActiveComponent toggleTo={toggelTo}/>
    </Modal>
  )
}

export default AuthLayout