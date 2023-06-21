import React, {useState, useEffect} from 'react';
import TaskList from './components/TaskList.js';
import './App.css';
import axios from 'axios';


const App = () => {
  const[taskData, setTaskData] = useState([]);
  const updateTaskData = updatedTask => {
    const tasks = taskData.map(task => {
      if(task.id === updatedTask.id){
        return updatedTask;
      } else{
        return task;
      }
    });
    //Start with path request, use callback style with setTaskData
    const status = updatedTask.isComplete ? 'mark_complete' : 'mark_incomplete';
    axios.patch(`https://task-list-api-c17.onrender.com/tasks/${updatedTask.id}/${status}`)
    .then(() => setTaskData(tasks))
    .catch(err => console.log(err));
  };
  
  const deleteTask = (id) => {
    //move into the .then
    setTaskData((prev) => prev.filter((task)=> task.id !== id));
    axios.delete(`https://task-list-api-c17.onrender.com/tasks/${id}`)
    .then((res) => console.log(res.data))
    .catch((err) => console.log(err));
  };
  
  useEffect(() => {
    axios.get('https://task-list-api-c17.onrender.com/tasks')
    .then(response => {
      setTaskData(response.data);
    })
    .catch(err => console.log(err));
  }, []);
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div><TaskList tasks={taskData}
           onUpdateTask={updateTaskData}
           onDeleteTask= {deleteTask} /></div>
      </main>
    </div>
  );
};

export default App;
