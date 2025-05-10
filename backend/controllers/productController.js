import { v2 as cloudinary} from "cloudinary"
import productModel from "../models/productModel.js"


// add product
// const addProduct = async (req,res) => {
//     try {
//         const {name,description,price,category,subCategory,sizes,bestseller,discount} = req.body
//         const discountValue = discount && discount >= 0 && discount <= 50 ? Number(discount) : 0;
//         const image1=req.files.image1 && req.files.image1[0]
//         const image2=req.files.image2 && req.files.image2[0]
//         const image3=req.files.image3 && req.files.image3[0]
//         const image4=req.files.image4 && req.files.image4[0]
        
//        const images = [image1,image2,image3,image4].filter((item)=> item !==undefined)
      
//        const imageUrl = await Promise.all(
//         images.map(async (item) => {
//             const result = await cloudinary.uploader.upload(item.path,{resource_type:"image"})
             
             
//              return result.secure_url
             
//         })
//        )
//        console.log(imageUrl);

//        const productData={
//          name,
//          description,
//          category,
//          price:Number(price),
//          subCategory,
//          bestseller:bestseller==="true" ? true : false,
//          sizes:JSON.parse(sizes),
//          image:imageUrl,
//          discount:discountValue,

//          date:Date.now()
//        }
       
       

//        const product = new productModel(productData)
//        await product.save()
      
        
//         res.json({success:true,message:"product added"})
//     } catch (error) {
//         console.log(error);
        
//         res.json({success:"false",message:error.message})
//     }
// }

const addProduct = async (req, res) => {
    try {
      const {
        name,
        description,
        price,
        category,
        subCategory,
        sizes,
        bestseller,
        discount,
      } = req.body;
  
      // Validate discount
      let discountValue = 0;
      if (discount) {
        const parsedDiscount = Number(discount);
        if (parsedDiscount >= 0 && parsedDiscount <= 50) {
          discountValue = parsedDiscount;
        } else {
          console.warn("Invalid discount value, using default (0).");
        }
      }
  
      // Handle image uploads (up to 4 images)
      const image1 = req.files.image1 && req.files.image1[0];
      const image2 = req.files.image2 && req.files.image2[0];
      const image3 = req.files.image3 && req.files.image3[0];
      const image4 = req.files.image4 && req.files.image4[0];
  
      const images = [image1, image2, image3, image4].filter((img) => img !== undefined);
  
      // Upload to Cloudinary and get secure URLs
      const imageUrls = await Promise.all(
        images.map(async (img) => {
          const result = await cloudinary.uploader.upload(img.path, {
            resource_type: "image",
          });
          return result.secure_url;
        })
      );
  
      // Prepare product data
      const productData = {
        name,
        description,
        category,
        price: Number(price),
        subCategory,
        bestseller: bestseller === "true",
        sizes: JSON.parse(sizes),
        discount: discountValue,
        image: imageUrls,
        date: Date.now(),
      };
  
      const product = new productModel(productData);
      await product.save();
  
      res.json({ success: true, message: "Product added successfully." });
    } catch (error) {
      console.error("Error in adding product:", error);
      res.status(500).json({ success: false, message: error.message || "Something went wrong." });
    }
  };
  


// list products
const listProduct = async (req,res) => {
    try {
        const products = await productModel.find({})
        res.json({success:true,products})
    } catch (error) {
        console.log(error);
        
        res.json({success:"false",message:error.message})
    }
    
}

//removing product
const removeProduct = async (req,res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id)
        res.json({success:true,message:"product removed"})
    } catch (error) {
        res.json({success:false,message:error.message})
    }

    
}

// single product 
const singleProduct = async (req,res) => {
    try {
        const {productId} = req.body
        const product = await productModel.findById(productId)
        res.json({success:true,product})
        
    } catch (error) {
        res.json({success:"false",message:error.message})
    }
    
}

const getSalesReport = async (req, res) => {
  try {
    const orders = await orderModel.find();
    res.json({ success: true, orders });
  } catch (error) {
    res.json({ success: false, message: "Failed to get sales report" });
  }
};

export {listProduct,addProduct,removeProduct,singleProduct,getSalesReport}