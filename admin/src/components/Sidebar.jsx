import React from 'react'
import { NavLink } from 'react-router-dom'

const Sidebar = ({setToken}) => {
  return (
    
   
      <div className="sidebar w-40 sm:w-36 md:w-44 lg:w-52 xl:w-64 h-screen bg-white shadow-md">
     
      <div className='flex flex-col gap-4 pt-6 pl-8 text-[15px]'>
        <NavLink className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l "to="/report">
          <p>REPORTS</p>
        </NavLink>

        <NavLink className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l "to="/add">
          <p>ADD PRODUCT</p>
        </NavLink>

        <NavLink className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l " to="/list">
          <p>LIST ITEMS</p>
        </NavLink>

        <NavLink className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l " to="/orders">
          <p>ORDERS</p>
        </NavLink>

        {/* <NavLink className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l "to="/logout">
          <p>LOGOUT</p>
        </NavLink> */}
        <div>
        <button onClick={()=>setToken('')} className='bg-gray-600 text-white px-5 py-2 sm:py-2 rounded-full text-xs sm:text-sm ' >Logout</button>
        </div>

      </div>

    
    </div>
   
  )
}

export default Sidebar
