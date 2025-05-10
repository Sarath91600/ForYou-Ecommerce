import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import {assets} from '../assets/assets'; 

const CarouselComponent = () => {
  return (
    <div className="w-full border border-gray-400">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop={true}

        spaceBetween={30}
        slidesPerView={1}
      >
        <SwiperSlide>
          <img src={assets.hero_img} alt="Hero 1" className="w-full  object-cover" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={assets.logo_2} alt="Hero 2" className="w-full  object-cover" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={assets.logo_3} alt="Hero 3" className="w-full  object-cover" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default CarouselComponent;