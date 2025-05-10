import React from 'react'
import { assets } from '../assets/assets'

const OurPolicies = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center pt-10 pb-10 text-xs sm:text-sm md:text-base text-gray-700 ' >
      <div>
        <img src={assets.exchange_icon} className='w-12 m-auto mb-2' ></img>
      <p className='font-semibold' > Easy Exchange Policy</p>
      
      </div>
      <div>
        <img src={assets.quality_icon} className='w-12 m-auto mb-2' ></img>
      <p className='font-semibold' > 7 Days Free Return Policy</p>
      
      </div>
      <div>
        <img src={assets.support_img} className='w-12 m-auto mb-2' ></img>
      <p className='font-semibold' > Best Customer support</p>
      
      </div>
    </div>
  )
}

export default OurPolicies
