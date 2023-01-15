const rol =require('../models/Rol')
const jwt= require('jsonwebtoken')
const {TOKEN_KEY}= require('../config/env')


const isCommon = async (req, res, next) => {
    try {
      const token = req.cookies.access_token;
      const user = jwt.verify(token, TOKEN_KEY);

      const roles = await rol.findOne({where:{id: user.rol_id}});
      
      if (roles.name === "admin") {
        next();
      }else{
        return res.status(403).json({ message: "Require admin Role!" })
      }
    } catch (error) {
      return res.status(500).send({ message: error });
    }
};


module.exports=isAdmin