const rol =require('../models/Rol')
const jwt= require('jsonwebtoken')
const {TOKEN_KEY}= require('../config/env')


const isAdmin = async (req, res, next) => {
    try {
      const token = req.cookies.access_token;
      const user = jwt.verify(token, TOKEN_KEY);
      const roles = await rol.findOne({where:{id: user.user.rolID}}).catch(err => err)
      
      if (roles.name === "admin") {

        next();
      }else{
        return res.status(403).json({ message: "Require admin Role!" })
      }
    } catch (error) {
      return res.status(500).send({ message: error });
      console.log(user)
    }
};


module.exports=isAdmin