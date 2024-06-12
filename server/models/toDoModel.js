import mongoose from 'mongoose'

const todoSchema = new mongoose.Schema({
title :{
    type:String,
},
isCompleted :{
    type:Boolean,
}
},{timestamps:true})

 const todoModel = mongoose.model('todo',todoSchema);

 export default todoModel;