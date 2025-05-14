import { useState } from 'react'

import './App.css'

function App() {
  const TODO = 'TODO';
  const DOING = 'DOING';
  const DONE = 'DONE';
  const[value, setValue] = useState('');
  const[tasks, setTasks] = useState([]);
  const[dragTask ,setDragaTask] = useState(null);
  const [updateItem, setUpdateItem] = useState(null);

  const handleKeyDown = (e) =>{
    if(e.keyCode===13){ // Enter pressed
      if(updateItem){
        const obj = {
          title: value,
          id: updateItem.id,
          status: updateItem.status
        }
        const copyTask = [...tasks];
        const filterList = copyTask.filter((item)=>item.id !== updateItem.id);
        setTasks((prevTasks) => [...filterList, obj])
        setUpdateItem(null);
        
      }else{
        const obj = {
          title: value,
          status: TODO,
          id: Date.now() // It gives unique timestamp
        }
        setTasks((prevTasks) => [...prevTasks, obj]);  // It is used to add task in obj but it array of object 
      }
      setValue('')


    }
  }
  const handleDrag = (e, task)=>{
     setDragaTask(task)
  }
  const handleDragNDrop = (status)=>{
        let copyTask = [...tasks];
        copyTask = copyTask.map((item)=>{
          if(dragTask.id === item.id){
            item.status=status;
          }
          return item;
       })
       setTasks(copyTask);
       setDragaTask(null);
  }
  const handleOnDrop = (e) =>{
     const status = e.target.getAttribute('data-status')
     if(status===TODO){
      handleDragNDrop(TODO)
     }else if(status === DOING){
      handleDragNDrop(DOING)
     }else if(status === DONE){
      handleDragNDrop(DONE)
     }
  }
  const onDragOver = (e)=>{
    e.preventDefault();
  }
  const deleteTask = (item)=>{
    let copyTask = [...tasks];
    copyTask = copyTask.filter((task)=>
       task.id !==item.id);
       setTasks(copyTask)
    
  }

  const updateTask = (task) =>{
    setUpdateItem(task);
    setValue(task.title);
  }
  
  return (
   <div className='App'>
    <h1>Task Manager</h1>
    <input 
    onChange={(e) => setValue(e.target.value)}
    type='text'
    value={value}
    onKeyDown={handleKeyDown}
    />
    <div className='board'>
      <div className="todo"
        data-status={TODO}
        onDrop={handleOnDrop}
        onDragOver={onDragOver}
      >
        <h2 className='todo-col'>Todo</h2>
       {tasks.length > 0 && tasks.map((task,index)=>(
         task.status === TODO &&<div
         onDrag={(e)=>handleDrag(e,task)}
         draggable
         key={task.id}
         className="task-item">
         {task.title}
         <div className="btns">
            <span className='btn'
            onClick={()=>updateTask(task)}
            >✏️</span>
            <span className='btn'
            onClick={(e)=>deleteTask(task)}
            >🗑️</span>
         </div>
       </div>
       ))}
      </div>

      <div className="doing"
       data-status={DOING}
        onDrop={handleOnDrop}
        onDragOver={onDragOver}
      >
        <h2 className='doing-col'>Doing</h2>
        {tasks.length > 0 && tasks.map((task,index)=>(
         task.status === DOING &&<div
         onDrag={(e)=>handleDrag(e,task)} 
         draggable
         key={task.id}
         className="task-item">
         {task.title}
         <div className="btns" >
            <span className='btn'
             onClick={()=>updateTask(task)}
            >✏️</span>
            <span className='btn'
            onClick={(e)=>deleteTask(task)}
            >🗑️</span>
         </div>
       </div>
       ))}
      </div>
      <div className="done"
         data-status={DONE}
         onDrop={handleOnDrop}
         onDragOver={onDragOver}
      >
        <h2 className='done-col'>Done</h2>
        {tasks.length > 0 && tasks.map((task,index)=>(
         task.status === DONE &&<div 
         onDrag={(e) => handleDrag(e,task)}
         draggable
         key={task.id}
         className="task-item">
         {task.title}
         <div className="btns" >
            <span className='btn'
             onClick={()=>updateTask(task)}
            >✏️</span>
            <span className='btn'
            onClick={(e)=>deleteTask(task)}
            >🗑️</span>
         </div>
       </div>
       ))}
      </div>

    </div>
   </div>
  )
}

export default App
