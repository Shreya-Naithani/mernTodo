import todoModel from "../models/toDoModel.js"


export const getAllTodos  = async(req,res)=>{

     try {
        const fetchAllTodos = await todoModel.find({});
        return res.status(200).json({message:"todo fetched successfully",data:fetchAllTodos});
     } catch (error) {
        return res.status(500).json({message:error.message});
     }
}


export const addNewTodo = async(req,res)=>{
    const {title ,isCompleted} = req.body;
    try {
        if(title || isCompleted){
          const addTodo = new todoModel({
            title,
            isCompleted
          });
          const saveTodo = await addTodo.save();
          console.log(saveTodo);
          return res.status(200).json({message:"Todo created successfully",data:saveTodo});
        }
        else{
            return res.status(400).json({message:"required all fields"});
        }
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
}

//fetching single todo

export const getSingleTodo = async(req,res)=>{
  const {id}= req.params;
    try {
          if(id){
            const saveTodo = await todoModel.findById(id);
            return res.status(200).json({message:"Single Todo fetched successfully",data:saveTodo});
          }
            return res.status(400).json({message:"Can't fetched this todo"});
     
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
}

//update Todo
export const updateTodo = async(req,res)=>{
    const {id} =req.params;
    const {title ,isCompleted} = req.body;
    try {
        if(id){
          const updateTodo = await todoModel.findByIdAndUpdate(id,
           req.body
          );

          return res.status(200).json({message:"Todo updated successfully",data:updateTodo});
        }
        else{
            return res.status(400).json({message:"invalid url"});
        }
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
}

//delete Todo
export const deleteTodo = async(req,res)=>{
   const {id} =req.params;
    try {
       
          await todoModel.findByIdAndDelete(id);
        

          return res.status(200).json({message:"Todo deleted successfully",data:updateTodo});

    } catch (error) {
        return res.status(500).json({message:error.message});
    }
}