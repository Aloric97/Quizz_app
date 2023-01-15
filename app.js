
//importing libraries from modules
const express=require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

//importing files
const {SERVER_PORT}= require('./config/env')

//importing database
const {connectDB} = require('./config/database')
const createTable= require('./config/createTables')

//importing routes
const auth = require('./routes/auth')

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//Configuring cookie-parser
app.use(cookieParser()); 

//importing routes
app.use(auth)



connectDB().then(
    app.listen(SERVER_PORT,()=>{
    console.log('listening on port '+SERVER_PORT)
}))
