//importing libraries from modules
const {DataTypes}= require('sequelize')
const {database}= require('../config/database')


//importing rol
const question = require('./Question')


const option = database.define('option',{

    text:{
        type:DataTypes.STRING
    },
    isCorrect:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    }
},{
    timestamps:false
})


//relationships 1 to many, of user and rol
question.hasMany(option)
option.belongsTo(question)

module.exports=option