


import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import CartTotal from '../components/CartTotal';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, getCartAmount, setCartItems } = useContext(ShopContext); // Accessing getCartAmount and setCartItems from context
  const [cartData, setCartData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!cartItems || !products || products.length === 0) return;
  
    const tempData = [];
    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        if (cartItems[itemId][size] > 0) {
          tempData.push({
            _id: itemId,
            size: size,
            quantity: cartItems[itemId][size],
          });
        }
      }
    }
    setCartData(tempData);
  }, [cartItems, products]); 

  // Merge guest cart with user cart if guest cart exists in localStorage
  useEffect(() => {
    const guestCart = JSON.parse(localStorage.getItem("cartItems"));
    if (guestCart && Object.keys(guestCart).length > 0) {
      // Merge logic
      const mergeCarts = (userCart, guestCart) => {
        const mergedCart = { ...userCart };

        for (const productId in guestCart) {
          if (!mergedCart[productId]) {
            mergedCart[productId] = guestCart[productId];
          } else {
            for (const size in guestCart[productId]) {
              if (!mergedCart[productId][size]) {
                mergedCart[productId][size] = guestCart[productId][size];
              } else {
                mergedCart[productId][size] += guestCart[productId][size];
              }
            }
          }
        }

        return mergedCart;
      };

      const merged = mergeCarts(cartItems, guestCart);
      setCartItems(merged);
      localStorage.removeItem("cartItems"); // Optional cleanup
    }
  }, []); // Empty dependency array ensures this runs only once on component mount

  if (!products || products.length === 0) {
    return <div className="text-center py-20 text-gray-500">Loading your cart...</div>;
  }

  return (
    <div className="border-t pt-7 px-4 sm:px-7 flex-grow">
      <h1 className="text-center text-3xl font-bold text-gray-800 mb-7">🛒 YOUR CART</h1>

      {cartData.length === 0 ? (
        <div className="flex-grow flex items-center justify-center text-gray-500 text-xl min-h-[300px]">
          <p>Your cart is empty 🛒</p>
        </div>
      ) : (
        <>
          <div className="space-y-6">
            {cartData.map((item, index) => {
              const productData = products.find(product => product._id === item._id);
              if (!productData) return null;

              return (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row items-center justify-between border border-gray-200 rounded-xl p-4 shadow-sm"
                >
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <img
                      className="w-20 h-20 object-contain rounded-lg"
                      src={productData.image[0]}
                      alt={productData.name}
                    />
                    <div>
                      <p className="text-lg font-semibold text-gray-900">{productData.name}</p>
                      <p className="text-sm text-gray-500">Size: {item.size}</p>
                      <p className="text-sm text-gray-500">Price: {currency}{productData.price}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mt-4 sm:mt-0">
                    <input
                      type="number"
                      min={1}
                      step="1"
                      defaultValue={item.quantity}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        if (val !== 0 && e.target.value !== '' && Number.isInteger(val)) {
                          updateQuantity(item._id, item.size, val);
                        }
                      }}
                      className="w-16 sm:w-20 px-2 py-1 border border-gray-300 rounded-md text-center focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    <button
                      onClick={() => updateQuantity(item._id, item.size, 0)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <img src={assets.bin_icon} alt="Remove" className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-end mt-14">
            <div className="w-full sm:w-[450px]">
              <CartTotal getCartAmount={getCartAmount} currency={currency} /> {/* Using getCartAmount from context */}
              <div className='w-full text-end'>
                <button onClick={() => navigate('/place-order')} className="bg-green-600 hover:bg-green-700 text-white text-sm my-8 px-8 py-3 rounded-md transition-colors duration-300">
                  PROCEED TO CHECKOUT
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;




// import React, { useContext, useEffect, useState } from 'react';
// import { ShopContext } from '../context/ShopContext';
// import CartTotal from '../components/CartTotal';
// import { useNavigate } from 'react-router-dom';
// import { assets } from '../assets/assets';

// const Cart = () => {
//   const { products, currency, cartItems, updateQuantity, getCartAmount,  } = useContext(ShopContext); // Accessing getCartAmount from context
//   const [cartData, setCartData] = useState([]);
//   const navigate = useNavigate();


//   useEffect(() => {
//     if (!cartItems || !products || products.length === 0) return;
  
//     const tempData = [];
//     for (const itemId in cartItems) {
//       for (const size in cartItems[itemId]) {
//         if (cartItems[itemId][size] > 0) {
//           tempData.push({
//             _id: itemId,
//             size: size,
//             quantity: cartItems[itemId][size],
//           });
//         }
//       }
//     }
//     setCartData(tempData);
//   }, [cartItems, products]); 
  
//   if (!products || products.length === 0) {
//     return <div className="text-center py-20 text-gray-500">Loading your cart...</div>;
//   }
  

//   return (
//     <div className="border-t pt-7 px-4 sm:px-7 flex-grow">
//       <h1 className="text-center text-3xl font-bold text-gray-800 mb-7">🛒 YOUR CART</h1>

//       {cartData.length === 0 ? (
//         <div className="flex-grow flex items-center justify-center text-gray-500 text-xl min-h-[300px]">
//           <p>Your cart is empty 🛒</p>
//         </div>
//       ) : (
//         <>
//           <div className="space-y-6">
//             {cartData.map((item, index) => {
//               const productData = products.find(product => product._id === item._id);
//               if (!productData) return null;

//               return (
//                 <div
//                   key={index}
//                   className="flex flex-col sm:flex-row items-center justify-between border border-gray-200 rounded-xl p-4 shadow-sm"
//                 >
//                   <div className="flex items-center gap-4 w-full sm:w-auto">
//                     <img
//                       className="w-20 h-20 object-contain rounded-lg"
//                       src={productData.image[0]}
//                       alt={productData.name}
//                     />
//                     <div>
//                       <p className="text-lg font-semibold text-gray-900">{productData.name}</p>
//                       <p className="text-sm text-gray-500">Size: {item.size}</p>
//                       <p className="text-sm text-gray-500">Price: {currency}{productData.price}</p>
//                     </div>
//                   </div>

//                   <div className="flex items-center gap-4 mt-4 sm:mt-0">
//                     {/* <input
//                       type="number"
//                       min={1}
//                       defaultValue={item.quantity}
//                       onChange={(e) => {
//                         const val = Number(e.target.value);
//                         if (val !== 0 && e.target.value !== '') {
//                           updateQuantity(item._id, item.size, val);
//                         }
//                       }}
//                       className="w-16 sm:w-20 px-2 py-1 border border-gray-300 rounded-md text-center focus:ring-2 focus:ring-blue-500 focus:outline-none"
//                     /> */}
//                     <input
//                          type="number"
//                            min={1}
//                             step="1"
//                              defaultValue={item.quantity}
//                              onChange={(e) => {
//                               const val = Number(e.target.value);
//                               if (val !== 0 && e.target.value !== '' && Number.isInteger(val)) {
//                                updateQuantity(item._id, item.size, val);
//                               }
//                             }}
//                             className="w-16 sm:w-20 px-2 py-1 border border-gray-300 rounded-md text-center focus:ring-2 focus:ring-blue-500 focus:outline-none"
//                     />
//                     <button
//                       onClick={() => updateQuantity(item._id, item.size, 0)}
//                       className="text-red-500 hover:text-red-700"
//                     >
//                       <img src={assets.bin_icon} alt="Remove" className="w-5 h-5" />
//                     </button>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>

//           <div className="flex justify-end mt-14">
//             <div className="w-full sm:w-[450px]">
//               <CartTotal getCartAmount={getCartAmount} currency={currency} /> {/* Using getCartAmount from context */}
//               <div className='w-full text-end' >
//                 <button onClick={() => navigate('/place-order')} className="bg-green-600 hover:bg-green-700 text-white text-sm my-8 px-8 py-3 rounded-md transition-colors duration-300">
//                   PROCEED TO CHECKOUT
//                 </button>
//               </div>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default Cart;



// import React, { useContext, useEffect, useState } from 'react';
// import { ShopContext } from '../context/ShopContext';
// import CartTotal from '../components/CartTotal';
// import { assets } from '../assets/assets';

// const Cart = () => {
//   const { products, currency, cartItems, updateQuantity,getCartAmount,navigate } = useContext(ShopContext);
//   const [cartData, setCartData] = useState([]);

//   useEffect(() => {
//     const tempData = [];
//     for (const itemId in cartItems) {
//       for (const size in cartItems[itemId]) {
//         if (cartItems[itemId][size] > 0) {
//           tempData.push({
//             _id: itemId,
//             size: size,
//             quantity: cartItems[itemId][size],
//           });
//         }
//       }
//     }
//     setCartData(tempData);
//   }, [cartItems]);

//   return (
//     <div className="border-t pt-14 px-4 sm:px-10">
//       <h1 className="text-center text-3xl font-bold text-gray-800 mb-10">🛒 YOUR CART</h1>

//       {cartData.length === 0 ? (
//         <div className="text-center py-20 text-gray-500 text-xl">
//           <p>Your cart is empty 🛒</p>
//         </div>
//       ) : (
//         <>
//           <div className="space-y-6">
//             {cartData.map((item, index) => {
//               const productData = products.find(product => product._id === item._id);
//               if (!productData) return null;

//               return (
//                 <div
//                   key={index}
//                   className="flex flex-col sm:flex-row items-center justify-between border border-gray-200 rounded-xl p-4 shadow-sm"
//                 >
//                   <div className="flex items-center gap-4 w-full sm:w-auto">
//                     <img
//                       className="w-20 h-20 object-contain rounded-lg"
//                       src={productData.image[0]}
//                       alt={productData.name}
//                     />
//                     <div>
//                       <p className="text-lg font-semibold text-gray-900">{productData.name}</p>
//                       <p className="text-sm text-gray-500">Size: {item.size}</p>
//                       <p className="text-sm text-gray-500">Price: {currency}{productData.price}</p>
//                     </div>
//                   </div>

//                   <div className="flex items-center gap-4 mt-4 sm:mt-0">
//                     <input
//                       type="number"
//                       min={1}
//                       defaultValue={item.quantity}
//                       onClick={(e) => {
//                         const val = Number(e.target.value);
//                         if (val !== 0 && e.target.value !== '') {
//                           updateQuantity(item._id, item.size, val);
//                         }
//                       }}
//                       className="w-16 sm:w-20 px-2 py-1 border border-gray-300 rounded-md text-center focus:ring-2 focus:ring-blue-500 focus:outline-none"
//                     />
//                     <button
//                       onClick={() => updateQuantity(item._id, item.size, 0)}
//                       className="text-red-500 hover:text-red-700"
//                     >
//                       <img src={assets.bin_icon} alt="Remove" className="w-5 h-5" />
//                     </button>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>

//           <div className="flex justify-end mt-14">
//             <div className="w-full sm:w-[450px]">
//               <CartTotal />
//               <div className='w-full text-end' >
//               <button onClick={()=>navigate('/place-order')}  className="bg-green-600 hover:bg-green-700 text-white text-sm my-8 px-8 py-3 rounded-md transition-colors duration-300">PROCEED TO CHECKOUT</button>
//               </div>

//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default Cart;
