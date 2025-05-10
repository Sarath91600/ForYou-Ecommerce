 import validator from "validator";
 import bcrypt from "bcrypt";
 import jwt from "jsonwebtoken"
import userModel from "../models/userModel.js";
import nodemailer from "nodemailer"
 import passport from 'passport';
 
const createToken = (id) => {
   return  jwt.sign({id},process.env.JWT_SECRET)
}

//route for user login
 const loginUser= async (req,res) => {
    try {
      const {email,password} = req.body;
      const user =await userModel.findOne ({email})
      if (!user) {
         return res.json({success:false,message:"user doesn't exists"}) 
      } 

      const isMatch=await bcrypt.compare(password,user.password)
      if (isMatch) {
         const token=createToken(user._id)

         res.json({ success: true, token, user: { name: user.name,email: user.email },message:"Welcome" });

            
      }else{
         res.json({success:false,message:"invalid credentials"})
      }
    }catch(error){
      console.log(error)
      res.json({success:false,message:error.message})
    }
 }


 // route for user signup
 const registerUser = async (req,res) => {
   try {

      const {name,email,password}= req.body;

      const exists = await userModel.findOne({email});
       if(exists){
         return res.json({success:false,message:"user already exists"})
       }
      
        //validating email and password
      if(!validator.isEmail(email)){
         return res.json({success:false,message:"please enter a valid email"})
      }

      if(password.length<9){
         return res.json({success:false,message:"please enter a strong password(9 number)"})
      }
      
     //hashing user password



      const salt=await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password,salt)
      
      const newUser=new userModel({
         name,
         email,
         password:hashedPassword
      })
      const user=await newUser.save() 

      const token=createToken(user._id)
      

      res.json({ success: true, token, user: { name: user.name,email: user.email },message:"Welcome" });
      
   } catch (error) {

      console.log(error)
      res.json({success:false,message:error.message})
      
   }
 }

 // route for admin login

 const adminLogin = async (req,res) => {
    try {
      const {email,password}=req.body
      if (email===process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
         const token = jwt.sign(email+password,process.env.JWT_SECRET)
         res.json({success:true,token})
      }else{
         res.json({success:false,message:"invalid credential"})
      }
    } catch (error) {
      console.log(error)
      res.json({success:false,message:error.message})
      
    }
 }


 
//////////////////////////   otp    //////////////////////



const otpStore = {}; // In-memory store; you can move this to Redis for production

// Send OTP
const sendOtp = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.json({ success: false, message: 'Email is required' });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  console.log(otp);
  
  otpStore[email] = otp;
 
  setTimeout(() => {
    delete otpStore[email];
  }, 1 * 60 * 1000); // 1 minutes expiry

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP is ${otp}. It will expire in 1 minutes.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: 'OTP sent to your email' });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: 'Failed to send OTP' });
  }
};

// Verify OTP
const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  if (otpStore[email] === otp) {
    delete otpStore[email];

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: 'User not found' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    return res.json({
      success: true,
      message: 'OTP verified successfully',
      token,
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } else {
    return res.json({ success: false, message: 'Invalid or expired OTP' });
  }
};


//  Google Authentication redirect
const googleAuthRedirect = (req, res) => {
    passport.authenticate('google', { scope: ['profile', 'email'] })(req, res);
};

//  handling Google Authentication callback
const googleAuthCallback = async (req, res) => {
  const user = req.user; 

  if (!user) {
    return res.status(400).json({ success: false, message: 'No user found' });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });

 res.redirect(`http://localhost:5173/googleRedirect?token=${token}&name=${req.user.name}&email=${req.user.email}`);
};





/////////////////////////////////////////  forgot password /////////////////////
const forgotPasswordOtpStore = {};

const forgotPasswordCheckEmail = async (req, res) => {
  const { email } = req.body;
  const user = await userModel.findOne({ email });

  if (!user) return res.json({ success: false, message: 'User not found' });
const resetOtp = Math.floor(100000 + Math.random() * 900000).toString();
  console.log(resetOtp);
  
  otpStore[email] = resetOtp;
 
  setTimeout(() => {
    delete otpStore[email];
  }, 1 * 60 * 1000); // 1 minutes expiry

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP is ${resetOtp}. It will expire in 1 minutes.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: 'OTP sent to your email' });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: 'Failed to send OTP' });
  }
 
};






 const forgotPasswordVerifyOtp = (req, res) => {
  const { email, otp } = req.body;

  if (forgotPasswordOtpStore[email] && forgotPasswordOtpStore[email] === otp) {
    delete forgotPasswordOtpStore[email];
    
  }

  res.json({ success: false, message: 'Invalid or expired OTP for password reset' });
};

 const forgotPasswordReset = async (req, res) => {
  const { email, newPassword } = req.body;

   if(newPassword.length<9){
         return res.json({success:false,message:"please enter a strong password(9 number)"})
      }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  const user = await userModel.findOneAndUpdate({ email }, { password: hashedPassword });

  if (!user) {
    return res.json({ success: false, message: 'User not found' });
  }


   const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    return res.json({
      success: true,
      message: 'password rest successfully',
      token,
      user: {
        name: user.name,
        email: user.email,
      },
    });
};





 

 



 export {loginUser,registerUser,adminLogin,sendOtp,verifyOtp,forgotPasswordCheckEmail,forgotPasswordReset,forgotPasswordVerifyOtp,googleAuthCallback,googleAuthRedirect}
