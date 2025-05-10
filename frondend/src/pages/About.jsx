import React from 'react';
import { assets } from '../assets/assets';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col px-4 md:px-10 bg-white">
      {/* Header Section */}
      <div className="text-center   border-gray-300 mt-2">
        <h1 className="text-4xl font-semibold text-gray-800">ABOUT US</h1>
        <p className="text-sm text-gray-500 mt-2">Know more about FOR YOU</p>
      </div>

      {/* Content Section */}
      <div className="my-12 flex flex-col md:flex-row gap-12 flex-grow items-center mt-2">
        <img
          className="w-full md:max-w-[450px] rounded-lg shadow-md"
          src={assets.about_img}
          alt="About FOR YOU"
        />

        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600 text-justify">
          <p>
            <strong>FOR YOU</strong> is your ultimate destination for fashion and lifestyle. We bring together
            the latest trends in clothing, accessories, perfumes, watches, and thoughtful gifts — all curated
            to help you express your unique style. Whether you're dressing up for a special occasion or looking
            for everyday essentials, FOR YOU offers premium quality with a personal touch.
          </p>
          <p>
            Our mission is simple: to make fashion accessible, fun, and meaningful. We believe shopping should
            be a joyful experience, so we've built a store that’s stylish, customer-friendly, and always focused
            on YOU. From handpicked collections to seamless service, everything we do is for you.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
