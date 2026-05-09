import { createContext, useEffect, useState } from "react";
import type { User } from "../types";
type AuthContextType = {
    userData: User | null,
    isLoading:boolean,
    updateUserData : (data: User)=>void,
    logout:()=>void
}

const defaultContext = {
    userData: null,
    isLoading:false,
    updateUserData : ()=>{},
    logout:()=>{}
}

const BASE_API_URL = import.meta.env.VITE_API_URL
const hasAuthCookie = () =>
    document.cookie
        .split(';')
        .some((cookie) => cookie.trim().startsWith('hasAuth='))

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType>(defaultContext)


const AuthContextProvider = ({children}:{children:React.ReactNode}) =>{

    const [userData, setUserData] = useState<User|null>(null)
    const [isLoading, setIsLoading] = useState(true)

    const updateUserData =(data:User) =>{
        console.log(data)
        setUserData(data)
        setIsLoading(false)
        console.log(data)
    }

    const logout = () =>{
        setUserData(null)
        setIsLoading(false)
    }
    useEffect(()=>{console.log(userData)},[userData])
    return(
        <AuthContext.Provider value={{userData, isLoading, updateUserData, logout}}>
            {children}
        </AuthContext.Provider>
    )
}


export default AuthContextProvider