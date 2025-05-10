import express from "express"
import passport from 'passport';
import { loginUser,registerUser,adminLogin,sendOtp,verifyOtp,forgotPasswordCheckEmail,forgotPasswordReset,forgotPasswordVerifyOtp,googleAuthCallback,googleAuthRedirect } from "../controllers/userController.js"
//import authUser from "../middleware/auth.js";
import jwt from 'jsonwebtoken';

const userRouter=express.Router();

userRouter.post("/register",registerUser)
userRouter.post("/login",loginUser)
userRouter.post("/admin",adminLogin)


//userRouter.get('/profile',authUser,getMyProfile);

userRouter.post('/send-otp', sendOtp);
userRouter.post('/verify-otp', verifyOtp);

//forgot password routes
userRouter.post('/check-email',forgotPasswordCheckEmail);
userRouter.post('/verify-otp', forgotPasswordVerifyOtp);
userRouter.post('/reset-password', forgotPasswordReset);


// Google Authentication Routes


// Google Authentication Route
userRouter.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'],prompt: 'select_account' })
  
);

// Google Authentication Callback Route
userRouter.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  googleAuthCallback // This will call your controller function
);


export default userRouter