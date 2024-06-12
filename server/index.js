import express from 'express';
import cors from 'cors';
import router from './routes/todoRoutes.js';
import connectToMongo from './config/db.js';
const app = express()

const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use('/api/v1',router)

connectToMongo();
app.get('/',(req,res)=>{
   res.send("API is running")
})

app.listen(PORT,()=>{
    console.log(`Server is running on PORT ${PORT}`);
})