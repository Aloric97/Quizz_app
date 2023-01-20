const question = require("../models/question");



const addQuestion =(req,res)=>{
    const {text,explication}= req.body;

    if(!(text)){
        res.status(404).json({status:404,message:'field cannot be empty'})
    }

    question.create({text:text,explication:explication})
    .then(
        
        res.status(201).json({message:'the question has been created successfully'}))
    .catch(err=>res.status(404).json({error:err}))
}



module.exports={addQuestion}