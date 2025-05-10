import React, { useContext } from 'react'
import Hero from '../components/Hero'
import LatestCollections from '../components/LatestCollections'
import { ShopContext } from '../context/ShopContext'
import Bestsellers from '../components/Bestsellers'
import OurPolicies from '../components/OurPolicies'


const Home = () => {
 
  const {products}=useContext(ShopContext)
   
  return (
    <div>
      <Hero />
      <LatestCollections />
      <Bestsellers />
      <OurPolicies />
      
    
      
    </div>
  )
}

export default Home
