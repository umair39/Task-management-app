
import {  useSelector,useDispatch } from 'react-redux';
import { useEffect} from 'react';
import { deleteTask, fetchTodo } from '../stores/taskSlice';
import EditTask from './EditTask';
import { useState } from 'react';

const TaskList = () => {
    const tasks =useSelector((state) => state.tasks.tasks);

    const loading =useSelector((state) => state.tasks.loading);
    const error =useSelector((state) => state.tasks.error);
    const statusFilter = useSelector((state) => state.tasks.status); // To get current status filter
    const [searchTerm, setSearchTerm] = useState("");
   
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchTodo())
    }, [dispatch])

    const filteredTasks = tasks.filter((task) => {
        return (
            (statusFilter === 'All' || task.status === statusFilter) &&
            task.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });


    const handleStatusChange = (e) => {
        dispatch({ type: 'tasks/changeStatusFilter', payload: e.target.value });
    };

    if(loading){
     return <p>Tasks Loading ....</p>
   }
   if(error){
     return <p>There is an error {error}</p>
   }
 const handleDelete = (id) => {
    dispatch(deleteTask(id))
 }

  return (
    <div>
        <div>
            <h2>Tasks</h2>
            <div className="mb-2">
                    <input
                        type="text"
                        placeholder="Search by title"
                        className="w-full px-3 py-2 border text-sm text-gray-700 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            <div className="mb-2"> 
         <select 
          value={statusFilter}
          onChange={handleStatusChange}
         className="w-full px-3 py-2 border text-sm text-gray-700 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500">
           <option  value="To Do">To Do</option>
           <option 
            value="In Progress">In Progress</option>
           <option  value="Completed">Completed</option>
         </select>
         
      </div>
            <ul className='space-y-4'>
                {filteredTasks.map((task,index) => (
                    <li key={index} className='bg-gray-50 p-4 rounded-md flex justify-between items-center'>
                        <div>
                            <h3 className='text-lg font-medium text-gray-800'>{task.title}</h3>
                            {task.description && <p className='text-gray-600'>{task.description}</p>}
                            <p className='mt-1 text-sm font-semibold'>
                               <span className='italic underline'> Status: {task.status}</span>
                            </p>
                        </div>
                        <div className='flex space-x-2'>
                            <EditTask   task ={task} />
                            <button className='px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600'
                            onClick={() => handleDelete(task.id)}
                            >Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    </div>
  )
}

export default TaskList;