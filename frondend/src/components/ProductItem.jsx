

import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';




     const ProductItem = ({ id, image, price, name,discount }) => {
     const { currency } = useContext(ShopContext);
     const offerPrice = (price - (price * discount / 100)).toFixed(2);

  return (
    <Link className='text-gray-700 cursor-pointer' to={`/product/${id}`}>
  {/* Image Container */}
  <div className='w-full h-60 overflow-hidden rounded-lg bg-white flex items-center justify-center shadow-md'>
    <img
      className='h-full w-full px-2 py-2 object-contain hover:scale-110 transition-transform duration-300 ease-in-out'
      src={image[0]}
      alt={name}
    />
  </div>

  {/* Text Section */}

 
  <div className="text-center mt-3">
       <p className="text-base font-semibold text-gray-800 hover:text-purple-600 transition-colors duration-200 line-clamp-1">{name}</p>
                             {/* Offer Price Section */}

       <div className="mt-2 text-center space-y-1">
  


  <p className="text-xs text-gray-500">Offer Price</p>
  <div className="flex justify-center items-center space-x-2">
    <p className="text-lg font-bold text-green-700">
      {currency}{offerPrice}
    </p>
    {discount > 0 && (
      <span className="text-xs font-bold text-yellow-700 bg-yellow-100 px-2 py-1 rounded-full">
        {discount}% OFF
      </span>
    )}
  </div>
</div>

</div>

  
</Link>

  );
  
};

export default ProductItem;

