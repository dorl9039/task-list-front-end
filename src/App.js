import React, {useState, useEffect} from 'react';
import axios from 'axios';

import TaskList from './components/TaskList.js';
import NewTaskForm from './components/NewTaskForm.js';

import './App.css';



const App = () => {
  const[taskData, setTaskData] = useState([]);
  //add taskDataConvert to convert is_complete
  const taskDataConvert = (res) => {
    return res.map((task) => {
      return{...task, isComplete: task.is_complete};
    });
  };

  useEffect(() => {
    axios.get('https://task-list-api-c17.onrender.com/tasks')
    .then(response => {
      setTaskData(()=> taskDataConvert(response.data));
    })
    .catch(err => console.log(err));
  }, []);
  

  const updateTaskData = updatedTask => {
    const status = updatedTask.isComplete ? 'mark_complete' : 'mark_incomplete';
    axios.patch(`https://task-list-api-c17.onrender.com/tasks/${updatedTask.id}/${status}`)
    .then(() => {
      setTaskData(prev => prev.map(task => 
        task.id === updatedTask.id ? updatedTask : task));
    })
    .catch(err => console.log(err));
  };
  
  const deleteTask = (id) => {
    axios.delete(`https://task-list-api-c17.onrender.com/tasks/${id}`)
    .then(() => setTaskData((prev) => prev.filter((task)=> task.id !== id))
    )
    .catch((err) => console.log(err));
  };
  
  const handleSubmit = (data) => {
    axios
      .post('https://task-list-api-c17.onrender.com/tasks', data)
      .then((res) => {
        setTaskData(() => taskDataConvert([res.data.task, ...taskData]));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <NewTaskForm handleSubmit={handleSubmit}/>
        <div><TaskList tasks={taskData}
           onUpdateTask={updateTaskData}
           onDeleteTask= {deleteTask} /></div>
      </main>
    </div>
  );
};

export default App;
