import React, { useEffect, useState } from 'react'
import { backenUrl, currency } from '../App'
import axios from 'axios'
import { toast } from 'react-toastify'

const List = ({ token }) => {
  const [list, setList] = useState([])

  const fetchList = async () => {
    try {
      const token = localStorage.getItem("token")

      const response = await axios.get(backenUrl + '/api/product/list', {
        headers: {
          token: token
        }
      })

      setList(response.data.products || [])
    } catch (error) {
      console.error('Fetch list failed:', error.response?.data?.message || error.message)
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        backenUrl + '/api/product/remove',
        { id },
        {
          headers: {
            token
          }
        }
      );

      if (response.data.success) {
        toast.success("Product removed successfully");
        await fetchList();
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.error('Error removing product:', error.response?.data?.message || error.message);
      toast.error("Failed to remove product");
    }
  }

  return (
    <>
      <p className="text-xl font-semibold mb-4">All Products List</p>

      <div className='flex flex-col gap-2'>
  {/* Table Header */}
  <div className='w-full grid grid-cols-[1fr_2fr_3fr_1fr_1fr_1fr] items-center py-2 px-4 border bg-gray-100 text-sm font-medium text-gray-700 rounded'>
    <b>Image</b>
    <b>Name</b>
    <b>Description</b>
    <b>Category</b>
    <b>Price</b>
    <b className='text-center'>Action</b>
  </div>

  {/* Table Rows */}
  {
    list.map((item, index) => (
      <div
        key={index}
        className="w-full grid grid-cols-[1fr_2fr_3fr_1fr_1fr_1fr] items-center py-3 px-4 border-b text-sm"
      >
        {/* Image */}
        <div className="w-full h-16 object-contain rounded mx-auto sm:mx-0">
          <img src={item.image[0]} alt="product" className="object-contain w-full h-full" />
        </div>

        {/* Product Name */}
        <p className="truncate w-full text-left">{item.name}</p>

        {/* Product Description */}
        <p className="truncate w-full text-left">{item.description}</p>

        {/* Category */}
        <p className="w-full text-left">{item.category}</p>

        {/* Price */}
        <p className="w-full text-left">{currency}{item.price}</p>

        {/* Action */}
        <button
          onClick={() => removeProduct(item._id)}
          className="w-full sm:w-auto text-center bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-400"
        >
          Delete
        </button>
      </div>
    ))
  }
</div>

    </>
  )
}

export default List
