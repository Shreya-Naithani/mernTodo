import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [edit, setEdit] =useState(false);
  const[render,setRender]=useState(false);
  const [isCompleted, setIsCompleted] = useState(false);


  useEffect(()=>{
   const fetchAllTodos = async()=>{
          const res = await axios.get('http://localhost:3000/api/v1/todos');
         setTodos(res.data.data);
   }
   fetchAllTodos();
  },[render,edit])

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (title.trim() === '') {
      alert("field is empty");
    };
   
    try {
      const res = await axios.post('http://localhost:3000/api/v1/todos',{title,isCompleted});
      setRender(!render);
      alert(res.data.message);
    } catch (error) {
      console.log(error.message)
    }

    setTitle('');
    setIsCompleted(false);
    setEdit(false);
  };

  const handleDeleteTodo = async(id) => {
    try {
      const res = await axios.delete(`http://localhost:3000/api/v1/todos/${id}`);
      setRender(!render);
      alert(res.data.message);
    } catch (error) {
      console.log(error.message);
    }
    
  };

  const handleEditTodo = async(id) => {
    setEdit(true);
    // const todoToEdit = todos.find(todo => todo.id === id);
    const res = await axios.get(`http://localhost:3000/api/v1/todos/${id}`)
    let todoToEdit= res.data.data;
    setTitle(todoToEdit.title);
    setIsCompleted(todoToEdit.isCompleted);
     await axios.delete(`http://localhost:3000/api/v1/todos/${id}`);
      setRender(!render);
    try {
   
      const res = await axios.put(`http://localhost:3000/api/v1/todos/${id}`,{ title:todoToEdit.title,
      isCompleted:todoToEdit.isCompleted,})
    
      console.log(res.data.data);
    } catch (error) {
      console.log(error.message);
    }
    
  };

  return (
    <div className="w-[100%] mt-10 mb-10">
      <h1 className="font-bold text-4xl mb-10 text-center">ToDo Application</h1>
      <div className=' w-[70%] ml-[15%] bg-gray-200  p-5 flex flex-col  text-center'>
      <form onSubmit={handleSubmit} className="mb-10">
        <div className="mb-4 flex ">
          <label htmlFor="title" className="w-fit mr-3 mb-2 ">Todo Title:</label>
          <input
            type="text"
            id="title"
            className="border -mt-2 p-2 rounded w-[70%]"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-4 flex">
          <label htmlFor="isCompleted" className="block mb-2 mr-3">Is Completed?</label>
          <input
            type="checkbox"
            id="isCompleted"
            className="p-2"
            checked={isCompleted}
            onChange={(e) => setIsCompleted(e.target.checked)}
          />
        </div>
        <button className="bg-blue-500 w-fit flex items-start text-white p-2 rounded" type="submit">{ !edit ? "Add Todo" :"UpdateTodo"}</button>
      </form>

      {todos.length > 0 && (
        <table className="table-auto w-full max-w-2xl">
          <thead>
            <tr>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Completed</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <tr key={todo.id}>
                <td className="border px-4 py-2">{todo.title}</td>
                <td className="border px-4 py-2">{todo.isCompleted ? 'Yes' : 'No'}</td>
                <td className="border px-4 py-2">
                  <button
                    className="text-blue-500 mr-2"
                    onClick={() => handleEditTodo(todo._id)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="text-red-500"
                    onClick={() => handleDeleteTodo(todo._id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      </div>
    </div>
  );
};

export default Home;
