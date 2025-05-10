
import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Home from "./pages/Home"
import Collections from "./pages/Collections"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Product from "./pages/Product"
import Cart from "./pages/Cart"
import Login from "./pages/Login"
import PlaceOrder from "./pages/PlaceOrder"
import Orders from "./pages/Orders"
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'
import MyProfile from './pages/MyProfile'
import ForgotPassword from './pages/ForgotPassword'
import NotFound from './components/NotFound';
import GoogleRedirect from './components/GoogleRedirect'
import { ToastContainer, toast } from 'react-toastify';

const App = () => {
  return (
    <div className="flex flex-col min-h-screen w-full">
    {/* px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] */}
      <ToastContainer />
      <Navbar/>
       <SearchBar />
       <main className="flex-grow">

      <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/collections' element={<Collections/>} />
      <Route path='/about' element={< About/>} />
      <Route path='/contact' element={<Contact/>} />
      <Route path="/googleRedirect" element={<GoogleRedirect />} />
      <Route path='/product/:productId' element={<Product/>} />
      <Route path='/cart' element={<Cart/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='place-order' element={<PlaceOrder/>} />
      <Route path='/orders' element={<Orders/>} />
      <Route path="/profile" element={<MyProfile />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
       <Route path="*" element={<NotFound />} />
      
      </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
