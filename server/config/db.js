import mongoose from 'mongoose'

const connectToMongo = async()=>{
    await mongoose.connect("mongodb://127.0.0.1:27017/mernToDo")
    .then(()=>{
        console.log("Database is connected successfully");
    }).catch((err)=>{
        console.log(err);
        console.log("Database is disconnected");
    })
}

export default connectToMongo;