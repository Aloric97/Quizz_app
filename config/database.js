//importing libraries from the modules
const {Sequelize}= require('sequelize')

//importing config
const {DB_NAME,DB_USER,DB_PASSWORD,DB_HOST,DB_DIALECT}= require('../config/env')


const database = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: DB_DIALECT
});


const connectDB= async ()=>{
    await database
    .authenticate()
    .then(
        console.log('conection database was established')
    )
    .catch(err=>{
        console.log(`There was mistake in the connection: ${err}`)
    })
}

const createTable= async ()=>{
    await database
    .sync({/*force: true*/})
    .then(
        console.log('table was created succesfully')
    )
    .catch(err=>{
        console.log(`There was error to create the tables: ${err}`)
    })
}

module.exports={
    database,
    connectDB,
    createTable
}