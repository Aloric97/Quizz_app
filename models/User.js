//importing libraries from modules
const {DataTypes}= require('sequelize')
const {database}= require('../config/database')

//importing rol
const rol = require('./Rol')


const user = database.define('user',{
    firstName:{
        type: DataTypes.STRING,
        allowNull:false,
        validate:{
            is: /^[a-z0-9]+$/i,
            len: [3,25]
        }
    },
    lastName:{
        type: DataTypes.STRING,
        allowNull:false,
        validate:{
            is: /^[a-z0-9]+$/i,
            len: [3,25]
        }
    },
    email:{
        type: DataTypes.STRING,
        unique: true,
        allowNull:false,
        validate:{
            isEmail:true,
            len: [8,50]
        }
    
    },
    password:{
        type: DataTypes.STRING,
        allowNull:false,
        validate:{
            len: [8,250]
        }
    }},{ timestamps: false }
)

//relationships 1 to many, of user and rol
rol.hasMany(user)
user.belongsTo(rol)

module.exports=user