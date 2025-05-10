import React, { useState } from 'react'
import axios from 'axios'
import { backenUrl } from '../App'
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 


const Login = ({setToken}) => {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault();
            const response = await axios.post(backenUrl + '/api/user/admin',{email,password})
           if (response.data.success) {
              setToken(response.data.token)
              toast.success("Welcome Admin")
              
              
           }else{
              toast.error(response.data.message)
           }
            
            
            
        } catch (error) {
            console.log(error);
            toast.error(error.message)
            
        }
    }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">ADMIN LOGIN</h1>
        
        <form  onSubmit={onSubmitHandler} action="" className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-gray-600">Email Address</label>
            <input onChange={(e)=>setEmail(e.target.value)}  value={email}
              id="email"
              type="email"
              placeholder="Enter Email"
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-600">Password</label>
            <input onChange={(e)=>setPassword(e.target.value)}  value={password}
              id="password"
              type="password"
              placeholder="Enter Password"
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login;
