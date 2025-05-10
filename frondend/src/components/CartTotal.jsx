import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';

const CartTotal = () => {
  const {getCartAmount,currency} = useContext(ShopContext)
  // Call the function to get the cart breakdown
  const { subtotal, discount, deliveryCharge, total } = getCartAmount(); // Using the passed getCartAmount function

  return (
    <div className='w-full'>
      <div className='text-2xl'>
        <h1>CART TOTAL</h1>
      </div>

      <div className='flex flex-col gap-2 mt-2 text-sm'>
        <div className='flex justify-between'>
          <p>Sub Total</p>
          <p>{currency} {subtotal}</p>
        </div>
        <hr />

        <div className='flex justify-between'>
          <p>Discount</p>
          <p className='text-green-600'> {currency} {discount}</p>
        </div>
        <hr />

        <div className='flex justify-between'>
          <p>Delivery Charge</p>
          <p>{currency} {deliveryCharge}</p>
        </div>
        <hr />

        <div className='flex justify-between'>
          <b>Total</b>
          <b>{currency} {total}</b>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;



// import React, { useContext } from 'react'
// import { ShopContext } from '../context/ShopContext'

// const CartTotal = () => {
 
//   const {currency,delivery_fee,getCartAmount}=useContext(ShopContext)
//   const cartSummary = getCartAmount()
//   return (
//     <div className='w-full' >
//       <div className='text-2xl'>
//        <h1>CART TOTAL</h1>
//       </div>
//        <div className='flex flex-col gap-2 mt-2 text-sm'>
         
//          <div className='flex justify-between' >
//           <p>Sub Total</p>
//           <p>{currency}{getCartAmount()}.00</p>

//           </div>

//           <div className='flex justify-between'>
//           <p>Discount</p>
//           <p className='text-green-600'>- {currency} {cartSummary.discount}</p>
//           </div>
//           <hr />

         
//           <div className='flex justify-between' >
//             <p>Delivery Charge</p>
//             <p>{currency} {delivery_fee}</p>

//           </div>
//           <hr />
//           <div className='flex justify-between'>
//            <b>Total</b>
//            <b>{currency}{getCartAmount()===0 ? 0 : getCartAmount() + delivery_fee}.00</b>
//           </div>

//        </div>
//     </div>
//   )
// }

// export default CartTotal
