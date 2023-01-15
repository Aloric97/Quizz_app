const {DataTypes}= require('sequelize')
const {database}= require('../config/database')



const rol = database.define('rol',{
    name:{
        type: DataTypes.STRING,
        validate:{
            is: /^[a-z0-9]+$/i,
            len: [8,25]
        }
    },
    description:{
        type: DataTypes.TEXT,
        validate:{
            len: [3,300]
        }
    }},{ timestamps: false }
)

module.exports=rol