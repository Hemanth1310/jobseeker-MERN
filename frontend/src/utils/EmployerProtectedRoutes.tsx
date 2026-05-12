import { useAuthContextData } from './useAuthContextData'
import Loading from '../components/layouts/Loading'
import { Navigate, Outlet } from 'react-router'

const EmployerProtectedRoutes = () => {
     const {userData, isLoading} = useAuthContextData()

     if(isLoading){
        return <Loading/>
     }

     if(userData && userData.role==='EMPLOYER'){
        return <Outlet/>
     }else{
        return <Navigate to={'/'}/>
     }

}

export default EmployerProtectedRoutes