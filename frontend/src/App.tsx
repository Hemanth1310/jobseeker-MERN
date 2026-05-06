

import { Routes, Route } from 'react-router-dom'
import './App.css'
import HeaderLayout from './components/layouts/HeaderLayout'
import Home from './views/Home'

function App() {


  return (
    <div className='w-screen min-h-screen bg-indigo-50 p-5'>
      <HeaderLayout/>
      <div className="p-5 flex-1 w-full flex gap-5 bg-mist-50 border border-mist-200 rounded-2xl">
          <div className="flex-5 min-h-full rounded-2xl p-5 box-border">
            <Routes>
              <Route path="/" element={<Home/>}></Route>
             
            </Routes>
          </div> 
        </div>
      
    </div>
  )
}

export default App
