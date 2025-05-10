import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backenUrl, currency } from '../App';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) return;
    try {
      const response = await axios.post(
        backenUrl + '/api/order/list',
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const statusHandler =async (event,orderId) => {
    try {
      const response = await axios.post(backenUrl + '/api/order/status',{orderId,status:event.target.value},{headers:{token}})
       if (response.data.success) {
        await fetchAllOrders()
       }
    } catch (error) {
      console.log(error);
      toast.error(response.data.message)
      
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div className="p-4 sm:p-8">
  <h3 className="text-2xl font-bold mb-6">Order Details</h3>

  <div className="space-y-6">
    {orders.map((order, index) => (
      <div
        key={index}
        className="border rounded-xl p-4 sm:p-6 shadow-md bg-white space-y-4"
      >
        <div className="flex items-start gap-4">
          <img
            src={assets.parcel_icon}
            alt="parcel"
            className="w-14 h-14 object-contain"
          />
          <div className="flex-1 space-y-1 text-sm sm:text-base">
            {order.items.map((item, idx) => (
              <p key={idx} className="text-gray-700">
                <span className="font-semibold">{item.name}</span> × {item.quantity}{" "}
                <span className="text-xs text-gray-500">({item.size})</span>
              </p>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 text-sm sm:text-base text-gray-700">
          <div>
            <p className="font-medium text-gray-900">Shipping Address:</p>
            <p>{order.address.firstName} {order.address.lastName}</p>
            <p>{order.address.houseName}</p>
            <p>{order.address.address}</p>
            <p>{order.address.state}, {order.address.pinNumber}</p>
            <p>📞 {order.address.mobileNumber}</p>
          </div>

          <div>
            <p><strong>Items:</strong> {order.items.length}</p>
            <p><strong>Method:</strong> {order.paymentMethod}</p>
            <p><strong>Payment:</strong> {order.payment ? "✅ Done" : "❌ Pending"}</p>
            <p><strong>Date:</strong> {new Date(order.date).toLocaleString()}</p>
            <p><strong>Total:</strong> {currency} {order.amount}</p>
          </div>
        </div>

        <div className="pt-2">
          <label className="font-medium mr-2">Status:</label>
          <select onChange={(e)=>statusHandler(event,order._id)} value={order.status} className="border rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="Order Placed">Order Placed</option>
            <option value="Packing">Packing</option>
            <option value="Shipped">Shipped</option>
            <option value="Out for delivery">Out for delivery</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>
      </div>
    ))}
  </div>
</div>

  );
};

export default Orders;
