const {DataTypes}= require('sequelize')
const {database}= require('../config/database')


//importing categories
const category = require('./Category')


const question= database.define("question",{
    text:{
        type:DataTypes.TEXT,
        allowNull:false,
        
    },
    explication:{
        type:DataTypes.TEXT,
        allowNull:true
    }

},{
    timestamps:false,
})


//relationships 1 to many. Category contains several question
category.hasMany(question)
question.belongsTo(category)

module.exports=question