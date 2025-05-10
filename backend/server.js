import express from "express"
import cors from "cors"
import 'dotenv/config'
import connectDB from "./config/mongodb.js"
import connectCloudinary from "./config/cloudinery.js"
import userRouter from "./routes/userRoute.js"
import productRouter from "./routes/productroute.js"
import carRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoutes.js"

import passport from './config/passport.js'; 
import session from 'express-session'; 


// App config

const app=express()
const port=process.env.PORT || 4000
connectDB()
connectCloudinary()

// middlewares

app.use(express.json())
app.use(cors())

app.use(session({
    secret:  process.env.SESSION_SECRET, 
    resave: false,
    saveUninitialized: true,
}));

// Initialize Passport.js
app.use(passport.initialize());
app.use(passport.session());


//api endpoints
app.use("/api/user",userRouter)
app.use("/api/product",productRouter)
app.use('/api/cart',carRouter)
app.use('/api/order',orderRouter)



app.get('/',(req,res)=>{
    res.send("api working")
})

app.listen(port,()=>console.log('server started in port4000'))