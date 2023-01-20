//importing libraries from modules
const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')


const {TOKEN_KEY,EXPIRES}= require('../config/env')

const User=require ("../models/User");
const Rol =require ("../models/Rol");


const getAllUsers = async (req, res) =>{
    const users = await User.findAll();

    if(users.length === 0) {
      res.status(400).json({error:'i dont have users'})
    }
    
    res.status(200).json({users})
}


const getUserById = async (req, res) => {
    const id = req.params.id

    const user = await User.findOne({
        where: {id: id},
        include: Rol
    })
    
    if(user){
        res.status(200).json({user})
    } else {
        res.status(404).json({message: 'User not found'})
    }
    
    

}


const createUser = async (req, res) => {
      const {firstName, lastName,email,password}=req.body


      if (!(firstName && lastName && email && password)){
        res.status(400).json({created:false,error:'there are empty values'})
      }
      
      const verifyEmail= await User.findOne({where: {email: email}})

      if (verifyEmail) {
          res.status(400).json({error:'this email is already in use'})
        }

      const salt= bcrypt.genSaltSync(10)
      const encryptedPassword= bcrypt.hashSync(password,salt)
  
      const newUser = await User.create(
          {
            firstName:firstName,
            lastName:lastName,
            email:email.toLowerCase(),
            password:encryptedPassword
          }
      )
      .then(
        assignRolUser(email)
        .then(
            res.status(200).json({create:true, message:'the user has been created successfully'})))
        .catch(
            err => res.status(500).json({create:false, message:err}))
      .catch(
        error =>res.status(400).json({create:false, message:error}))
        
}



const deleteUser = async (req, res) => {
    const id = req.params.id
    const user = await User.destroy({
        where: {
          id: id,
        }})
    .then(() => res.status(200).json({delete:true, message:'user deleted successfully'}))
    .catch(error => res.status(400).json({delete:false,message:error}))    
}


const updateUser = async (req, res) => {
    const userData=req.body
    const id = req.params.id

    await User.update(userData, {
        where: {
          id: id,
        }
      })
      .then(() => res.status(200).json({update:true, message:'user updated successfully'}))
      .catch(err=>res.status(404).json({update:false, message:err}))
}



const assignRolUser = async (email) => {
    //assign rol 'common' a  new user created
    const findRole= await Rol.findOne({where:{name:'common'}})
    const idUser=findRole.id
    const userUpdated=await User.update({rolId:idUser}, {where: {email:email}})
}




const login =async (req, res) => {
    email=req.body.email
    password=req.body.password

    if(!(email && password)){
        res.status(404).json({error:'imputs emptys'})
    }

    //check if email is exist
    const checkUser= await User.findOne({ where: { email: email }})
 
    if(!checkUser){
     return res.status(401).json({ message: 'Authentication failed. Invalid email' });
    }
 
    if(!bcrypt.compareSync(password, checkUser.password)){
     return res.status(401).json({ message: 'Authentication failed. Invalid password' });
    }

    const user = await User.findOne(
        {attributes: ['firstName', 'lastName','email','rolID'], where: { email}})
 
    const token=jwt.sign(
        {user:user}, 
        TOKEN_KEY,
        {expiresIn:EXPIRES}
    )
     
     return res
     .cookie("auth-cookie",token,{ maxAge: 2 * 60 * 60 * 1000, httpOnly: true} ) //expire 2 hours
     .status(201).json({
         success: true,
         message: 'Authentication successful',
         accessToken:token
         
     }) 
}

const perfilUser= (req,res)=>{
    const token = req.cookies.auth-cookie;
    const user = jwt.verify(token, TOKEN_KEY).user;
    res.status(200).json({user})
}




module.exports={
    getAllUsers,
    getUserById,
    createUser,
    deleteUser,
    updateUser,
    login,
    perfilUser
}