const jwt= require('jsonwebtoken')

const {TOKEN_KEY}= require('../config/env')

const user = require('../models/User')



verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  
    if (!token) {
      return res.status(403).send({ message: "user must be authenticated!" });
    }

  
    jwt.verify(token, TOKEN_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: "Unauthorized!" });
      }
      req.userId = decoded.id;
      next();
    });
};


const isAuthenticated = async (req,res,next)=>{
  try {
      const {token} = req.cookies;
      if(!token){
          return next('Please login to access the data');
      }
      const verify =jwt.verify(token,TOKEN_KEY);
      req.user = await user.findById(verify.id);
      next();
  } catch (error) {
     return next(error); 
  }
}
module.exports=verifyToken  