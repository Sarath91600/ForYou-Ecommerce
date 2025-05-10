import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'

const LatestCollections = () => {
    const {products} = useContext(ShopContext)
    const[latestProduct,setLatestproducts]=useState([])
  useEffect(()=>{
setLatestproducts(products.slice(5,10))
  },[products])
  
    return (
    <div className='my-10'>
    <div className='text-center py-8 text-3xl' >
      <Title text1={'NEW'} text2={' COLLECTIONS'} />
    <p className='W-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600 px-2' >Discover the latest in trendsetting fashion with our brand-new collection at FOR YOU Fashion Store! From chic streetwear to elegant evening styles, each piece is crafted to make a statement. Step into the season with confidence and elevate your wardrobe today</p>
    </div>
 
  {/* display products */}
  <div className='px-4 sm:px-0'>
  <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6' >
    {
        latestProduct.map((item, index) => {
          
          return (
            <ProductItem
              key={index}
              id={item._id}
              image={item.image}
              name={item.name}
              price={item.price}
              discount={item.discount}
            />
          );
        })
    }
  </div>
  </div>
    </div>
  )
}

export default LatestCollections
