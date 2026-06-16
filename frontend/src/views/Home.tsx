
import { useAuthContextData } from '../utils/useAuthContextData'
import { Navigate } from 'react-router'
import Loading from '../components/layouts/Loading'

const Home = () => {
   const {userData,isLoading} = useAuthContextData()

   if(isLoading){
    return <Loading/> 
   }

   if(userData){
      if(userData.role==='CANDIDATE'){
        return <Navigate to='/dashboard'/>
      }else{
        return <Navigate to='/employer/dashboard'/>
      }
   }
  return (
    <div className='w-full h-full flex items-center'>
        <div className='flex-1 h-full flex flex-col  '>
            <h1 className='text-4xl'>Discover companies.</h1>
            <h1 className='text-4xl'>Find your dream job.</h1>
        </div>
        <div className='flex-1 bg-amber-300'>

        </div>
    </div>
  )
}

export default Home