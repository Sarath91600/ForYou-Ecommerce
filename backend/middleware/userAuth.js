

import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {
  const { token } = req.headers;
 

  if (!token) {
    return res.json({ success: false, message: "Please login" });
  }

  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
     req.body.userId = token_decode.id;  // Inject userId into body
     
     
    
    next();
  } catch (error) {
    console.log("Token error:", error);
    res.json({ success: false, message: "Invalid token" });
  }
};

export default authUser;
