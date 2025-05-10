import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'

const Bestsellers = () => {
    const {products}=useContext(ShopContext)
  const [bestSeller,setBestseller]=useState([])
  useEffect(()=>{
    
const bestProduct=products.filter((item)=>(item.bestseller))
setBestseller(bestProduct.slice(0,10))
  },[products])
    return (
    <div className='mt-10 mb-4'>
        <div className='text-center text-3xl py-8' >
      <Title text1={'TRENDING'} text2={' COLLECTIONS'} />
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600' >Step into style with our Trending Collections, curated to keep you ahead of the fashion curve. From bold statements to everyday essentials, these picks are what everyone’s loving right now. Don’t miss out—upgrade your wardrobe with the season’s most-wanted pieces!</p>
        </div>
        <div className='px-4 sm:px-0'>
          <div className='grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
           {
          bestSeller.map((item) => (
         <ProductItem key={item._id} id={item._id} name={item.name} image={item.image} price={item.price} discount={item.discount} />
            ))
           }
           </div>
        </div>
      
    </div>
  )
}

export default Bestsellers
