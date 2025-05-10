import React from 'react'
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="w-full border-t border-black" style={{ backgroundColor: '#ffcccc' }}>
      <div className="px-6 flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-10 text-sm">
        <div>
          <p className="text-xl font-semibold mb-5">FOR YOU</p>
          <p className="w-full md:w-2/3 text-gray-600 leading-relaxed">
            FOR YOU brings heartfelt gifts and premium lifestyle picks to make every moment special.  
            From perfumes to teddy bears, our handpicked items are crafted with love.  
            Perfect for you and your loved ones — shop now and spread joy.
          </p>
        </div>

        <div>
          <p className="text-xl font-semibold mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
          <li className="hover:text-black cursor-pointer">
      <Link to="/">Home</Link>
     </li>
    <li className="hover:text-black cursor-pointer">
      <Link to="/about">About Us</Link>
    </li>
            {/* <li className="hover:text-black cursor-pointer">Delivery</li>
            <li className="hover:text-black cursor-pointer">Privacy Policy</li> */}
          </ul>
        </div>

        <div>
          <p className="text-xl font-semibold mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+91 92070 97224</li>
            <li>0470-2687209</li>
            <li>foryou@gmail.com</li>
          </ul>
        </div>
      </div>

      <hr />
      <div>
        <p className="py-5 text-sm text-center ">
          © 2025 foryou.com — All Rights Reserved
        </p>
      </div>
    </div>
  )
}

export default Footer
