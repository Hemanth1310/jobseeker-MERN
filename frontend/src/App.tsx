

import { Routes, Route } from 'react-router-dom'
import './App.css'
import HeaderLayout from './components/layouts/HeaderLayout'
import Home from './views/Home'
import { ToastContainer } from 'react-toastify'
import CandidateDashboard from './views/CandidatePages/CandidateDashboard'
import EmployerDashboard from './views/EmployerPages/EmployerDashboard'
import EmployerProtectedRoutes from './utils/EmployerProtectedRoutes'
import CandidateProtectedRoutes from './utils/CandidateProtectedRoutes'
import MakeAPost from './views/EmployerPages/MakeAPost'
import UpdateAPost from './views/EmployerPages/UpdateAPost'
import CandidateAppplications from './views/CandidatePages/CandidateAppplications'
import JobApplications from './views/EmployerPages/JobApplications'

function App() {


  return (
    <div className='w-screen min-h-screen flex flex-col bg-indigo-50 text-mist-900 p-5'>
      <HeaderLayout/>
      <div className="p-5 flex-1 w-full h-full flex gap-5 bg-mist-50 border border-mist-200 rounded-2xl">
          <div className="min-h-full w-full rounded-2xl p-5 box-border">
            <Routes>
              <Route path="/" element={<Home/>}></Route>
              <Route element={<EmployerProtectedRoutes/>}>
                  <Route path='/employer/dashboard' element={<EmployerDashboard/>}/>
                  <Route path='/employer/make-a-post' element={<MakeAPost/>}/>
                  <Route path='/employer/update-a-post/:id' element={<UpdateAPost/>}/>
                   <Route path='/employer/applications/:id' element={<JobApplications/>}/>
              </Route>
               <Route element={<CandidateProtectedRoutes/>}>
                  <Route path='/dashboard' element={<CandidateDashboard/>}/>
                  <Route path='/candidate/job/:id' element={<JobApplications/>}/>
                  <Route path='/MyApplications' element={<CandidateAppplications/>}/>
              </Route>
             
            </Routes>
          </div> 
        </div>
      <ToastContainer/>
    </div>
  )
}

export default App
