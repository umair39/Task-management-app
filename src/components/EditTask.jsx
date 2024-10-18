import { useState } from "react";
import { useDispatch } from "react-redux";
import { editTask } from "../stores/taskSlice";
const EditTask = ({ task }) => {
 
  // const { task.id,task.title, task.description, task.status } = task;  // destructuring the prop object to get the task object.
    const [isEdit, setIsEditing] = useState(false);;
    const [title, setTitle] =useState(task.title);
    const [description, setDescription] =useState(task.description);
    const [status, setStatus] =useState(task.status);
    const dispatch = useDispatch();

   const handleEdit = () => {
     dispatch(editTask({ id:task.id, title, description, status}));
     setIsEditing(false);
   }

  return (
    <>
    {isEdit ?(
      <div  className="absolute bg-white p-4 border rounded-md shadow-lg z-10">
        <h2 className="text-xl font-semibold mb-3 text-indigo-500">Edit Task</h2>
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
          value={description}
          onChange = {(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 text-sm border text-gray-700 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-2"
          required
          rows='3'
          ></textarea>
      </div>
      <div className="mb-4">
         <select
         value={status}
         onChange = {(e) => setStatus(e.target.value)}
         className="w-full px-3 py-2 border text-sm text-gray-700 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500">
           <option value="To Do">To Do</option>
           <option value="In Progress">In Progress</option>
           <option value="Completed">Completed</option>
         </select>
      </div>
      <div className="flex justify-between">
        
      <button type="submit"
      onClick={handleEdit}
      className="bg-indigo-600 text-white py-2 px-2 rounded-md hover:bg-indigo-700">
       Save
      </button>
      <button className="bg-gray-300 py-2 px-2 rounded-md"
       onClick={() => setIsEditing(false)}>
      Cancel</button>
      </div>
      </div>
    ):(
      <>
         <button className='px-3 py-1 bg-blue-500 text-white px-2 rounded-md hover:bg-blue-600'
         onClick={() => setIsEditing(true)}>
         Edit
         </button>
      </>
    )}   
    </>
  )
}

export default EditTask