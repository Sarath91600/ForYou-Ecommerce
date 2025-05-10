


import React, { useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { backenUrl } from '../App'
import { toast } from 'react-toastify'

const Add = ({ token }) => {
  const [image1, setImage1] = useState(false)
  const [image2, setImage2] = useState(false)
  const [image3, setImage3] = useState(false)
  const [image4, setImage4] = useState(false)

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("Men")
  const [subCategory, setSubCategory] = useState("Topwear")
  const [besteller, setBestSeller] = useState(false)
  const [sizes, setSizes] = useState(["S"])
  const [discount,setDiscount] = useState("")

  const [loading, setLoading] = useState(false)  // Loading state

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    setLoading(true)
 

    if (discount !== "" && (discount < 0 || discount > 50)) {
      toast.error("Discount should be between 0 and 50.");
      setLoading(false);
      return;
   }


    
   

    try {
      const formData = new FormData()

      formData.append("name", name)
      formData.append("description", description)
      formData.append("price", price)
      formData.append("category", category)
      formData.append("subCategory", subCategory)
      formData.append("bestseller", besteller)
      formData.append("sizes", JSON.stringify(sizes))
      formData.append("discount",discount)

      image1 && formData.append("image1", image1)
      image2 && formData.append("image2", image2)
      image3 && formData.append("image3", image3)
      image4 && formData.append("image4", image4)

      const response = await axios.post(backenUrl + "/api/product/add", formData, { headers: { token } })
      
      if (response.data.success) {
        toast.success(response.data.message)
        setName('')
        setDescription("")
        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)
        setPrice("")
        setDiscount('')
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    } finally {
      setLoading(false)  // Set loading to false after the request finishes
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col w-full items-start gap-3 px-3 py-2">
      {/* Loading Indicator */}
      {loading && (
        <div className="loading-message">
          <p>Please wait...</p>
        </div>
      )}

      {/* Product Name */}
      <div className="w-full">
        <p className="mb-2">Product Name</p>
        <input onChange={(e) => setName(e.target.value)} value={name}
          className="w-full max-w-[500px] px-3 py-2 border border-gray-400 rounded-md"
          type="text" required />
      </div>

      {/* Product Description */}
      <div className="w-full">
        <p className="mb-2">Product Description</p>
        <textarea onChange={(e) => setDescription(e.target.value)} value={description}
          className="w-full max-w-[500px] px-3 py-2 border border-gray-400 rounded-md"
          rows="4" required />
      </div>

      {/* Category, SubCategory, Price */}
      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">

      <div>
          <p className="mb-2">Product Category</p>
          <select onChange={(e) =>setCategory (e.target.value)} className="border border-gray-400 w-full py-2">
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>
        
        <div>
          <p className="mb-2">Sub Category</p>
          <select onChange={(e) =>setSubCategory (e.target.value)} className="border border-gray-400 w-full py-2">
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>

        

        <div>
          <p className="mb-2">Product Price</p>
          <input onChange={(e) => setPrice(e.target.value)} value={price}
            className="border border-gray-400 w-1/2 py-2 px-3"
            type="number" />
        </div>
      </div>

      {/* Upload Images */}
      <div className="w-full">
        <p className="mb-2">Upload Image</p>
        <div className="flex gap-2">
          <label htmlFor="image1">
            <img className="w-20" src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="Upload" />
          </label>
          <input onChange={(e) => setImage1(e.target.files[0])} type="file" id="image1" hidden />

          <label htmlFor="image2">
            <img className="w-20" src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="Upload" />
          </label>
          <input onChange={(e) => setImage2(e.target.files[0])} type="file" id="image2" hidden />

          <label htmlFor="image3">
            <img className="w-20" src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt="Upload" />
          </label>
          <input onChange={(e) => setImage3(e.target.files[0])} type="file" id="image3" hidden />

          <label htmlFor="image4">
            <img className="w-20" src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="Upload" />
          </label>
          <input onChange={(e) => setImage4(e.target.files[0])} type="file" id="image4" hidden />
        </div>
      </div>

            {/* discount */}
        <div>
          <p className='mb-2' >Discount (%)</p>
          <input onChange={(e) => setDiscount(e.target.value)} value={discount}
            className="border border-gray-400 w-1/2 py-2 px-3"
            type="number" />

        </div>    

      {/* Product Sizes */}
      <div>
        <p className='mb-2'>Product Sizes</p>
        <div className="flex gap-3 flex-wrap">
          {["S", "M", "L", "XL", "XXL"].map((sz) => (
            <div key={sz} onClick={() => setSizes(prev => prev.includes(sz) ? prev.filter(item => item !== sz) : [...prev, sz])}>
              <p className={`${sizes.includes(sz) ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer rounded-md`}>{sz}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bestseller Checkbox */}
      <div className='flex gap-2 mt-2'>
        <input onChange={() => setBestSeller(prev => !prev)} checked={besteller} type="checkbox" id='bestseller' />
        <label className='cursor-pointer' htmlFor="bestseller">Select Bestseller</label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}  // Disable the button while loading
        className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-md transition-all duration-300">
      {loading ? 'Please Wait Adding Product...' : 'Add Product'}
      </button>
    </form>
  )
}

export default Add

