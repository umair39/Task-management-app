import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
const initialState ={
    tasks: [],
    error: null,
    loading:false,
    status:'All',
}
export const fetchTodo = createAsyncThunk('tasks/fetchTodo', async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
    const data = await response.json();
    return data.map(task =>(
        {
            id: task.id,
            title: task.title,
            description:'',
            status:task.completed ? 'Completed': "To Do"
        }
    ))
})
    const taskSlice = createSlice({
    name:'tasks',
    initialState,
    reducers:{
        addTask:(state,action ) =>{
            state.tasks.push(action.payload);
        },
        editTask:(state,action) =>{
            state.tasks = state.tasks.map(task => (
                task.id === action.payload.id ? action.payload : task
            ))
        },
        deleteTask: (state, action) =>{
            state.tasks = state.tasks.filter(task => task.id!== action.payload)
        }, 
        changeStatusFilter: (state, action) => {
            state.status = action.payload; // Update the status filter
        },
       
        
    },
    extraReducers:(builder) => {
        builder.addCase(fetchTodo.pending, (state) => {
         state.loading = true;
         state.error = null
       }).addCase(fetchTodo.fulfilled, (state, action) => {
         state.loading = false;
         state.tasks = action.payload
       }).addCase(fetchTodo.rejected, (state, action) => {
         state.loading = false;
         state.error = action.error.message
       })
    }
});
export const {addTask, editTask,deleteTask,  changeStatusFilter} = taskSlice.actions;
export default taskSlice.reducer;