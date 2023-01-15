const rol = require('../models/Rol')
const { Op } = require("sequelize");

const userCommon ={
    name:'common',
    description:'user with access to 1) list alls categories of app 2) enter to especify category and see its applications 3)enter to detail of one aplication'
}

const userAdmin={
    name:'admin',
    description:'user with access to all'
}


const createRoles= async ()=>{
    const find= await rol.findOne({
        where:{
            [Op.or]:
            [
                {name:'common'},
                {name:'admin'}
            ]}
    }) 
    if(!find) {
        const roles = await rol.bulkCreate([userCommon,userAdmin])
        console.log('roles created successfully')
    }else{
        console.error('roles have already been created before')
    }
}


module.exports={createRoles}