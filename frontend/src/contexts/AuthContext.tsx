import { createContext, useState } from "react";
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

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType>(defaultContext)


const AuthContextProvider = ({children}:{children:React.ReactNode}) =>{

    const [userData, setUserData] = useState<User|null>(null)
    const [isLoading, setIsLoading] = useState(true)

    const updateUserData =(data:User) =>{
        setIsLoading(true)
        setUserData(data)
        setIsLoading(false)
    }

    const logout = () =>{
        setIsLoading(true)
        setUserData(null)
        setIsLoading(false)
    }
    return(
        <AuthContext.Provider value={{userData, isLoading, updateUserData, logout}}>
            {children}
        </AuthContext.Provider>
    )
}


export default AuthContextProvider