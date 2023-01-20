
const routes = require('express').Router()

//importing controllers
const userController = require('../controllers/userController')

const verifyToken = require('../middlewares/verifyToken')
const isAdmin = require('../middlewares/isCommon')


routes.post('/register', userController.createUser)
routes.get('/allUsers',verifyToken, userController.getAllUsers)
routes.get('/user/:id',verifyToken, userController.getUserById)
routes.put('updateUser/:id', verifyToken,isAdmin,userController.updateUser)
routes.delete('deleteUser/:id',verifyToken,isAdmin, userController.deleteUser)
routes.post("/login",userController.login)
routes.get('/user-profile',verifyToken,userController.perfilUser)


module.exports=routes