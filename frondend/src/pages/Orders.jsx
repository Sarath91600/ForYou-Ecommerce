import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'

const Orders = () => {
const{backendUrl,token,currency}=useContext(ShopContext)

const [orderData,setOrderData] = useState([])

const loadOrderdData = async () => {
  try {
    if (!token) {
      return null
    }

    const response = await axios.post(backendUrl + '/api/order/userOrders',{},{headers:{token}})
     if(response.data.success){
       const allOrdersItem = []
       response.data.orders.map((order)=>{
        order.items.map((item)=>{
          item['status'] = order.status
          item['payment'] = order.payment
          item['paymentMethod'] = order.paymentMethod
          item['date'] = order.date
          //item['price'] = order.price
          allOrdersItem.push(item)
        })
       })
       setOrderData(allOrdersItem.reverse())
       

     }
   
  } catch (error) {
    
  }
}

useEffect(() => {
  loadOrderdData()

 
}, [token])


  return (
    <div className='border-t pt-2 px-4  mt-12' >
    
      <div className='text-2xl'>
       <h1>MY ORDERS</h1>
      </div>
        <div className=''>
          {
            orderData.map((item,index)=>(
              // <div key={index} className='py-4 border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4   '>
              <div key={index} className='py-4 border-b text-gray-700 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4'>

                 <div className='flex items-start gap-6 text-sm '>
                    <img className="w-24 h-24 object-contain bg-white p-2 border rounded" src={item.image[0]} alt="" />
                 
                   <div>
                   <p className='sm:text-base font-medium' >{item.name}</p>
                   <div className='flex items-center gap-3 mt-2 text-base text-gray-700' >
                       <p className='text-sm'>Price: {currency}{item.price}</p>
                       <p>Quantity: {item.quantity}</p>
                       <p>Size : {item.size}</p>
                   </div>
                        <p>Date : <span className='text-gray-400'>{new Date(item.date).toLocaleString()}</span></p>
                        <p>Payment : <span className='text-gray-400'>{item.paymentMethod}</span></p>
              </div>
              </div>
               <div className='md:w-1/2 flex justify-between'>
                  <div className='flex items-center gap-2'>
                   <p className='min-w-2 h-2 rounded-full bg-green-400'></p>
                   <p>{item.status}</p>
                  </div>
                   {/* <button onClick={loadOrderdData} className='border px-4 py-2 text-sm font-medium rounded-sm ' >Track Order</button> */}

               </div>
              </div>


            ))
          }
        </div>
       
      
    </div>
  )
}

export default Orders
