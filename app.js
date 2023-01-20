
//importing libraries from modules
const express=require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

//importing files
const {SERVER_PORT}= require('./config/env')

//importing database
const {connectDB} = require('./config/database')
const createTable= require('./config/createTables')

//importing middlewares
const pageNotFound = require('./middlewares/pageNotFound')

//importing routes
const auth = require('./routes/auth')
const category = require('./routes/categoryRoute')
const question = require('./routes/questionRoute')

const app = express();

const corsConfig = {
    origin: true,
    credentials: true,
  };

//enable cors
app.use(cors(corsConfig));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//Configuring cookie-parser
app.use(cookieParser()); 

//importing routes
app.use('/auth',auth)
app.use('/category',category)
app.use('/question',question)
app.use(pageNotFound)



connectDB().then(
    app.listen(SERVER_PORT,()=>{
    console.log('listening on port '+SERVER_PORT)
}))
