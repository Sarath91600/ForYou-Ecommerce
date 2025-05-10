import React from 'react'
import {assets} from "../assets/assets"

const Navbar = () => {
  return (
    <div style={{ backgroundColor: '#ffcccc' }} className='flex items-center py-2 px-[4%] justify-between'>
      <img  className='w-[max(7%,70px)]' src={assets.logo} alt="" />
      <h1 className="ml-4 text-yellow-800 text-2xl font-bold tracking-wide">
    ADMIN DASHBOARD
  </h1>
    </div>
  )
}

export default Navbar
