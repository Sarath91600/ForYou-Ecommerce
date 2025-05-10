import React from 'react';
import { assets } from '../assets/assets';

const Contact = () => {
  return (
    <div className="min-h-screen px-4 md:px-10 py-6 bg-white flex flex-col">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-semibold text-gray-800">CONTACT US</h1>
      </div>

      {/* Content */}
      <div className="flex flex-col md:flex-row justify-center items-center mt-8 gap-12 md:gap-16">
        {/* Image */}
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md">
          <img
            className="w-full rounded-lg shadow-md"
            src={assets.contact_img}
            alt="Contact"
          />
        </div>

        {/* Contact Info */}
        <div className="w-full max-w-lg text-center md:text-left text-gray-700 text-sm sm:text-base px-2 sm:px-4">
          <div className="mb-6">
            <h2 className="font-semibold text-lg text-black mb-1">Head Office</h2>
            <p>Office 202, For You Complex</p>
            <p>6th Floor, Trivandrum</p>
          </div>

          <div className="">
            <h2 className="font-semibold text-lg text-black mb-1">Mobile Numbers</h2>
            <p>+91 92070 97224</p>
            <p>0470 2687209</p>
          </div>

          <div>
            <h2 className="font-semibold text-lg text-black mb-1">Email</h2>
            <p>foryousupport@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
