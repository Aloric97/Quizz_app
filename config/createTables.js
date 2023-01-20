const user = require('../models/User')
const rol = require('../models/Rol')
const category = require('../models/category')
const question = require('../models/question')
const option = require('../models/option')

const {createTable}= require('./database')
const {createRoles} = require('./defaultRoles')

//create all tables defined in the models

createTable()
.then(()=>
   {createRoles()
    .then(()=>console.log('roles created successfully'))
    .catch(()=>console.log(`there was the error to create roles:${err}`))}
)
.catch(err=>console.error(`there was the error to create tabls:${err}`))