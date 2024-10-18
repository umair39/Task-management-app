import {useState} from 'react';
import { useDispatch } from 'react-redux';
import {v4 as uuid4} from 'uuid'
import { addTask } from '../stores/taskSlice';
const AddTask = () => {
    const [title, setTitle] =useState('');
    const [Desc, setDesc] =useState('');
    const [status, setStatus] =useState('To Do');
    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        e.preventDefault();
        const newTask = {
            id: uuid4(),
            title,
            description: Desc,
            status,
            // completed: false
        }
        dispatch(addTask(newTask));
        setTitle('');
        setDesc('');
        setStatus('To Do');
      };
  return (
    <>
    <form className="mb-6" onSubmit={handleSubmit}>
        <h2 className="text-xl font-semibold mb-3 text-indigo-500">Add New Task</h2>
        <div className="mb-4">
           <input
            type="text"
            value={title}
            onChange = {(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border text-sm text-gray-700 bg-white rounded-md focus:outline-none focus:ring-indigo-500"
            placeholder="Task Name "
            required
           />
        </div>
        <div className="mb-4">
            <textarea 
            placeholder= "task description"
            value={Desc}
            onChange = {(e) => setDesc(e.target.value)}
            className="w-full px-3 py-2 text-sm border text-gray-700 bg-white rounded-md focus:outline-none focus:ring-indigo-500"
            required
            rows='3'
            ></textarea>
        </div>
        <div className="mb-4">
           <select
           value={status}
           onChange = {(e) => setStatus(e.target.value)}
           className="w-full px-3 py-2 border text-sm text-gray-700 bg-white rounded-md focus:outline-none focus:ring-indigo-500">
             <option value="To Do">To Do</option>
             <option value="In Progress">In Progress</option>
             <option value="Completed">Completed</option>
           </select>
        </div>
        <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700">
         Add Task
        </button>
    </form>
    </>
  )
}

export default AddTask