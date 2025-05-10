import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backenUrl, currency } from '../App';
import { toast } from 'react-toastify';

const Report = ({ token }) => {
  const [report, setReport] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalItemsSold: 0,
    codOrders: 0, // Add for COD orders
    razorpayOrders: 0, // Add for Razorpay orders
  });

  const fetchSalesReport = async () => {
    try {
      const response = await axios.get(backenUrl + "/api/order/salesReport", {
        headers: { token }
      });
      console.log("Sales Report Data:", response.data);
      
      if (response.data.success) {
        const orders = response.data.orders;

        const totalRevenue = orders.reduce((acc, order) => acc + order.amount, 0);
        const totalOrders = orders.length;
        const totalItemsSold = orders.reduce((acc, order) => {
          return acc + order.items.reduce((itemAcc, item) => itemAcc + item.quantity, 0);
        }, 0);

        // Count COD and Razorpay orders
        const codOrders = orders.filter(order => order.paymentMethod === 'COD').length;
        const razorpayOrders = orders.filter(order => order.paymentMethod === 'Razorpay').length;

        setReport({
          totalRevenue,
          totalOrders,
          totalItemsSold,
          codOrders,
          razorpayOrders,
        });

      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch sales report");
    }
  };

  useEffect(() => {
    if (token) {
      fetchSalesReport();
    }
  }, [token]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Sales Report</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white shadow-md rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-700">Total Revenue</h3>
          <p className="text-xl font-bold text-green-600">{currency} {report.totalRevenue}</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-700">Total Orders</h3>
          <p className="text-xl font-bold text-blue-600">{report.totalOrders}</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-700">Items Sold</h3>
          <p className="text-xl font-bold text-purple-600">{report.totalItemsSold}</p>
        </div>
        {/* Display COD and Razorpay orders */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-700">COD Orders</h3>
          <p className="text-xl font-bold text-orange-600">{report.codOrders}</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-700">Razorpay Orders</h3>
          <p className="text-xl font-bold text-blue-500">{report.razorpayOrders}</p>
        </div>
      </div>
    </div>
  );
};

export default Report;
