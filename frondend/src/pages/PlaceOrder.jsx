import React, { useContext, useState } from 'react'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import { toast } from 'react-toastify'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';


const PlaceOrder = () => {

const [method,setMethod]=useState('cod')
const {backendUrl,token,cartItems,setCartItems,getCartAmount,delivery_fee,productData,} =useContext(ShopContext)
 const navigate = useNavigate();


const [formData,setFormData] = useState({
  firstName:"",
  lastName:"",
  email:"",
  houseName:"",
  address:"",
  state:"",
  pinNumber:"",
  mobileNumber:""


})

const onChangeHandler = (event)=>{
 const name = event.target.name
 const value = event.target.value

 setFormData(data=>({...data,[name]:value}))
}


const initPay = (order)=>{
 const options = {
  key:import.meta.env.VITE_RAZORPAY_KEY_ID,
  amount:order.amount,
  currency:order.currency,
  name:'Order Payment',
  description:'Order Pyment',
  order_id:order.id,
  receipt:order.receipt,
  handler:async (response) => {
    try {
      const {data} = await axios.post(backendUrl + '/api/order/verifyRazorpay',response,{headers:{token}})
      if (data.success) {
       
        Swal.fire({
          title: "order placed successfully",
          icon: "success",
          draggable: true
        });
       setTimeout(() => {
        setCartItems({});
        
        navigate('/orders');
        
       }, 1000);
      }
    } catch (error) {
      console.log(error);
      toast.error(error)
      
    }
    
  }

 }
 const rzp = new window.Razorpay(options)
 rzp.open()
}

const onSubmitHandler = async (event) => {
  event.preventDefault();


///////////////////////////////////////////////////////////////
   let isCartEmpty = true;
  for (const productId in cartItems) {
    for (const size in cartItems[productId]) {
      if (cartItems[productId][size] > 0) {
        isCartEmpty = false;
        break;
      }
    }
    if (!isCartEmpty) break;
  }

  if (isCartEmpty) {
    toast.error("Your cart is empty!");
    return;
  }

/////////////////////////////////////////////////////////////////////////////////////////////
  if (!token) {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    
    Swal.fire("please login to place order");

    return;
  }
  
  try {
    let orderItems = [];

    for (const productId in cartItems) {
      const sizeQuantities = cartItems[productId];

      for (const size in sizeQuantities) {
        const quantity = sizeQuantities[size];
        

        if (quantity > 0) {
         
          const productInfo = structuredClone(productData.find(p => p._id === productId));
          console.log("Product with Discount:", productInfo)

          if (productInfo) {
            
            productInfo.size = size;  
            productInfo.quantity = quantity;  
            orderItems.push(productInfo);
          }
        }
      }
    }

    const orderData = {
      address:formData,
      items:orderItems,
      amount:getCartAmount().total,
      discount: getCartAmount().discount
      
    }

    switch(method){
     //api calls for cash on delivery COD
     case 'cod':
      const response = await axios.post(backendUrl + '/api/order/place',orderData,{headers:{token}} )
    
      
      if (response.data.success) {
      
        Swal.fire({
          title: "order placed successfully",
          icon: "success",
          draggable: true
        });
        setCartItems({});
        setTimeout(() => {
          navigate('/orders');
        }, 1500);
      } else {
        toast.error(response.data.message);
      }
      break;
      case 'razorpay':

       const responseRazorpay = await axios.post(backendUrl + '/api/order/razorpay',orderData,{headers:{token}})
       if (responseRazorpay.data.success) {
         initPay(responseRazorpay.data.order);
         
       }


      default:
        break;

    }
    
  } catch (error) {
    console.log(error);
    toast.error("An error occurred while submitting the order.");
  }
};



  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t' >
      {/*......................... letft side............... */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px] mx-4' >
       <div className='text-xl sm:text-2xl my-3' >
        <h1 >DELIVERY INFORMATION</h1>

       </div>
       <div className='flex gap-3'>
         <input onChange={onChangeHandler} name='firstName'  value={formData.firstName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='First Name'required  ></input>
         <input onChange={onChangeHandler} name='lastName'  value={formData.lastName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='Last Name' required  ></input>
       </div>
       <input onChange={onChangeHandler} name='email'  value={formData.email} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='email' placeholder='Email' ></input>
       <input onChange={onChangeHandler} name='houseName'  value={formData.houseName} className='border border-gray-300 rounded py-1 px-3.5 w-full' type='text' placeholder='House Name'required  ></input>
       <div className='flex gap-3'>
         <input onChange={onChangeHandler} name='address'  value={formData.address} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='Address'required  ></input>
         <input onChange={onChangeHandler} name='state'  value={formData.state} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='State' ></input>
       </div>
       <div className='flex gap-3'>
         <input onChange={onChangeHandler} name='pinNumber'  value={formData.pinNumber} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='Pin Number'required  ></input>
         <input onChange={onChangeHandler} name='mobileNumber'  value={formData.mobileNumber} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='Mobile Number' required ></input>
       </div>
      </div>
      {/* ...........................right side ..................*/}
    
      <div className='mt-8  mx-4'>
        <div className='mt-8 min-w-80 '>
          <CartTotal />
        </div>

        <div className='mt-12'>
          <h2>PAYMENT METHOD</h2>
             {/*...................payment method............. */}
          <div className='flex gap-3 flex-col lg:flex-row'>
            
            <div onClick={()=>setMethod('razorpay')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer ' >
              <p  className={`min-w-3.5 h-3.5 border rounded-full ${method==="razorpay" ? 'bg-green-400 ': '' }`} ></p>
               <img  className='h-5 mx-4' src={assets.razorpay_logo} ></img>
            </div>
            <div onClick={()=>setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer ' >
              <p  className={`min-w-3.5 h-3.5 border rounded-full ${method==="cod" ? 'bg-green-400 ': '' }`} ></p>
               <p className='text-gray-500 text-sm font-medium mx-4' >CASH ON DELIVERY</p>
            </div>
          </div>
           
          <div className='w-full text-end mt-8'>
            <button type='submit'  className="bg-green-600 hover:bg-green-700 text-white text-sm my-8 px-8 py-3 rounded-md transition-colors duration-300" >PLACE ORDER</button>
          </div>
        </div>

      </div>
    </form>
  )
}

export default PlaceOrder
