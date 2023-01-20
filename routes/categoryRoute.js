const routes = require('express').Router()

//importing controllers
const {addCategory,showQuestionsByCategory,findAllsCategory,deleteCategoryById} = require('../controllers/categoryController')



routes.post('/addCategory', addCategory)
routes.get('/showCategory', showQuestionsByCategory)
routes.get('/findAllsCategory', findAllsCategory)
routes.delete('/deleteCategory/:id', deleteCategoryById)



module.exports=routes