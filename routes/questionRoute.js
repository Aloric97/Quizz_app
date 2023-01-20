const routes = require('express').Router()

//importing controllers
const {addQuestion} = require('../controllers/questionController')



routes.post('/addQuestion', addQuestion)




module.exports=routes