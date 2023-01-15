const {DataTypes}=require('sequelize')


const {database}= require('../config/database')

const category = database.define('category',{
    nombre:{
        type:DataTypes.STRING,
        unique:true,
        validate:{
            len:[5,30]
        }
    }
},
{
    timestamps: false 
})


module.exports=category