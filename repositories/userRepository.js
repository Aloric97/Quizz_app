//importing libraries
const bcrypt=require('bcryptjs')


//importing config
const {TOKEN_KEY,EXPIRES}= require('../config/env')

const Rol =require ("../models/Rol");
const User=require ("../models/User");

const getAllUsers = async () => {
  const users = await User.findAll();

  if(users.length === 0) {
    res.status(400).json({error:'i dont have users'})
  }
  
  return users;
};

const getUserById = async (userId) => {
  const user = await User.findByPk(userId, {
    include: Rol
  });
  if (!user){
    res.status(404).json({error:'user not found'})
  }

  return user;
};


const verifyEmail = async (email) => {
    const verifyEmail= await User.findOne({where: {email: email}})

    return verifyEmail
}

const createUser = async (firstName,lastName,email,password) => {

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
    return newUser

};

const deleteUser = async (userId) => {
  try {
    const user = await User.destroy({
      where: {
        id: userId,
      },
    });

    return user;
  } catch (error) {
    return error;
  }
};

const updateUser = async (userData, userId) => {
  try {
    await User.update(userData, {
      where: {
        id: userId,
      },
    });

    const user = await User.findByPk(userId);

    return user;
  } catch (error) {
    return error;
  }
};

const assignRolUser = async (userData, userId) => {
    //assign rol 'common' a  new user created
    try {
        const findRole= await Rol.findOne({where:{name:'common'}})
        const idUser=findRole.id
        const userUpdated=await User.update({rolId:idUser}, {where: {email:email}})
        return userUpdated
    }catch (error) {
        return error
    }
    
}


module.default={
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
  updateUser,
  verifyEmail
};