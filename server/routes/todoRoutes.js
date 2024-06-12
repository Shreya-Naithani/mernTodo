import express from 'express';
import {getAllTodos,addNewTodo,getSingleTodo,updateTodo,deleteTodo} from '../controller/todoController.js'
 const router = express.Router();


router.get('/todos',getAllTodos);
router.post('/todos',addNewTodo);
router.get('/todos/:id',getSingleTodo);
router.put('/todos/:id',updateTodo);
router.delete('/todos/:id',deleteTodo);


 export default router;