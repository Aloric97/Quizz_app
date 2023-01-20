
//importing models
const category=require("../models/Category");
const question =require("../models/Question");


const addCategory=async (req,res)=>{
    const nuevoNombre=req.body.nombre;

    const duplicateName= await category.findOne({where: {nombre:nuevoNombre}})

    if (duplicateName){
        res.status(401).json({ status: 401, message:'already existing category'})
    }

    const newCategory=await category.create({nombre:nuevoNombre})
    .then(res.status(201).json({ status: 201, message:'category created successfully'}))
    .catch(err=>res.status(401).json({ status: 401, message:err}))
}

const showQuestionsByCategory=async (req,res)=>{
    const categoria= req.query.categoria

    const Category_Id= await category.findOne({where: {nombre:categoria}}).then((data)=>{return data.id})
    const findQuestions= await question.findAll({where: {CategoryId:Category_Id}})
    .then(data => {res.status(200).json( data)})
    .catch(err=>res.status(400).json({ status: 400, message:err}))

}

const deleteCategoryById = async(req, res) => {
    id=req.params.id;
    const delCategory = await category.destroy({where: {id:id}})
    .then(msg => {res.status(200).json({ status: 200, message:'the category was deleted'})})
    .catch(err => {res.status(403).json({ status: 403, message: err})})
}


const findAllsCategory=async (req,res)=>{
    const allCategories=await category.findAll()
    .then(data=>res.status(200).json(data))
    .catch(err=>{res.status(400).json({message:err})})
}


module.exports={
    addCategory,
    showQuestionsByCategory,
    findAllsCategory,
    deleteCategoryById
}