import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import Reports from './pages/Reports'
import Orders from './pages/Orders'
import Add from './pages/Add'
import List from './pages/list'
import {  ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 



export const backenUrl = import.meta.env.VITE_BACKEND_URL
export const currency = '₹'

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token')? localStorage.getItem('token') : "")


  useEffect(()=>{
  localStorage.setItem('token',token)
  },[token])

  return (
    <div className='bg-gray-50 min-h-screen'>
      <ToastContainer />
      {token === "" ?  (
        <Login setToken={setToken} />
      ) : (
        <>
          <Navbar setToken={setToken}  />
          <div className='flex w-full'>
            <Sidebar setToken={setToken} />
            <div className='w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base '>
              <Routes>
                
                <Route path='/report' element={<Reports  token={token} />} />
                <Route path='/add' element={<Add token={token} />} />
                <Route path='/list' element={<List token={token} />} />
                <Route path='/orders' element={<Orders token={token} />} />
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default App
