import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productdata, setProductData] = useState(null);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');
  const navigate = useNavigate();

  const fetchProductdata = () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
      }
      return null;
    });
  };

  useEffect(() => {
    fetchProductdata();
  }, [productId]);

  return productdata ? (
    <div className='border-t pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/* Product Section */}
      <div className='flex gap-12 flex-col sm:flex-row'>
        {/* Product Images */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row px-2'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {productdata.image.map((item, index) => (
              <div
                key={index}
                className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer h-20 sm:h-24 flex items-center justify-center border rounded-md'
                onClick={() => setImage(item)}
              >
                <img
                  src={item}
                  className='max-w-full max-h-full object-contain'
                  alt=""
                />
              </div>
            ))}
          </div>

          <div className='w-full sm:w-[60%] h-80 flex items-center justify-center bg-white'>
            <img className='max-w-full max-h-full object-contain' src={image} alt="" />
          </div>
        </div>

        {/* Product Info */}
        <div className='flex-1 px-2'>
          <h1 className='font-medium text-2xl mt-2'>{productdata.name}</h1>

          {/* Ratings */}
          <div className='flex items-center gap-1 mt-2'>
            <img src={assets.star_icon} alt="" className='w-4' />
            <img src={assets.star_icon} alt="" className='w-4' />
            <img src={assets.star_icon} alt="" className='w-4' />
            <img src={assets.star_icon} alt="" className='w-4' />
            <img src={assets.star_dull_icon} alt="" className='w-4' />
            <p className='pl-2'>(110)</p>
          </div>

          {/* Description */}
          <p className='mt-5 text-gray-500 md:w-4/5'>{productdata.description}</p>

          {/* Price Section */}
          <div className="mt-5 space-y-1">
            <p className="text-sm text-gray-500">Original Price</p>
            <p className="text-base line-through text-red-500 font-semibold">
              {currency}{productdata.price}
            </p>

            <p className="text-sm text-gray-500">Offer Price</p>
            <div className="flex items-center gap-2">
              <p className="text-xl font-bold text-green-700">
                {currency}{(productdata.price - (productdata.price * productdata.discount / 100)).toFixed(2)}
              </p>
              {productdata.discount > 0 && (
                <span className="text-sm font-semibold text-yellow-700 bg-yellow-100 px-2 py-1 rounded-full">
                  {productdata.discount}% OFF
                </span>
              )}
            </div>
          </div>

          {/* Size Selection */}
          <div className='flex flex-col gap-4 my-8'>
            <p>Select Size</p>
            <div className='flex gap-2'>
              {productdata.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  key={index}
                  className={`border px-4 py-1 rounded hover:bg-black hover:text-white transition ${item === size ? 'border-orange-500' : ''}`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart Button */}
          {/* <button
            onClick={() => {
              if (!size) {
                toast.error("Please select a size");
                return;
              }
              addToCart(productdata._id, size);
              setTimeout(() => {
                navigate('/cart');
              }, 1000);
            }}
            className="bg-green-500 text-white px-8 py-3 text-sm active:bg-gray-700"
          >
            ADD TO CART
          </button>
          <button  >VIEW CART</button> */}

<button
  onClick={() => {
    if (!size) {
      toast.error("Please select a size");
      return;
    }
    addToCart(productdata._id, size); // Only adds product to cart
  }}
  className="bg-green-500 text-white px-8 py-3 text-sm mr-2 active:bg-gray-700"
>
  ADD TO CART
</button>

<button
  onClick={() => navigate('/cart')} // Navigate directly to cart
  className="bg-blue-500 text-white px-8 py-3 text-sm active:bg-gray-700"
>
  VIEW CART
</button>

          {/* Info Notes */}
          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
            <p>* 100% Original product.</p>
            <p>* Cash on delivery is available on this product.</p>
            <p>* Easy return and exchange policy within 7 days</p>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <RelatedProducts category={productdata.category} subCategory={productdata.subCategory} />

      {/* Toast Notifications */}
      <ToastContainer position="top-center" autoClose={2000} hideProgressBar />
    </div>
  ) : (
    <div className='opacity-0'></div>
  );
};

export default Product;
