import express from "express"
import  {listProduct,addProduct,removeProduct,singleProduct,
    
} from "../controllers/productController.js"
import upload from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js"


import orderRouter from "./orderRoutes.js";


const productRouter=express.Router()

productRouter.post("/add",adminAuth,upload.fields([{name:'image1',maxCount:1},{name:'image2',maxCount:1},{name:'image3',maxCount:1},{name:'image4',maxCount:1}]),addProduct);

productRouter.post("/remove",adminAuth,removeProduct);
productRouter.post("/single",adminAuth,singleProduct);
//productRouter.get("/list",adminAuth,listProduct);


productRouter.get("/list", listProduct);

//sales reports
orderRouter.get('/salesReport',adminAuth, );




export default productRouter;
