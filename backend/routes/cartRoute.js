import express from "express"
import { addToCart,getUserCart,updataCart } from "../controllers/cartController.js"
import authUser from "../middleware/userAuth.js"



const carRouter = express.Router()

carRouter.post('/get',authUser,getUserCart)
carRouter.post('/add',authUser,addToCart)
carRouter.post('/update',authUser,updataCart)




export default carRouter