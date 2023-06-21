import React, {useState, useEffect} from 'react';
import TaskList from './components/TaskList.js';
import './App.css';
import axios from 'axios';

// const TASKS = [
//   {
//     id: 1,
//     title: 'Mow the lawn',
//     isComplete: false,
//   },
//   {
//     id: 2,
//     title: 'Cook Pasta',
//     isComplete: true,
//   },
// ];

const App = () => {
  
  
  const[taskData, setTaskData] = useState([]);
  const updatedTaskData = updatedTask => {
    const tasks = taskData.map(task => {
      if(task.id === updatedTask.id){
        return updatedTask;
      } else{
        return task;
      }
    });

    if (updatedTask.isComplete) {
      axios.patch(`https://task-list-api-c17.onrender.com/tasks/${updatedTask.id}/mark_complete`)
      .then(console.log(`${updatedTask.id} marked complete`))
      .catch(err => console.log('IF', err));
    } else if (!updatedTask.isComplete) {
      axios.patch(`https://task-list-api-c17.onrender.com/tasks/${updatedTask.id}/mark_incomplete`)
      .then(console.log(`${updatedTask.id} marked incomplete`))
      .catch(err => console.log('ELSE', err));
    }
    setTaskData(tasks);
  };
  
  const deleteTask = (id) => {
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
           onUpdateTask={updatedTaskData}
           onDeleteTask= {deleteTask} /></div>
      </main>
    </div>
  );
};

export default App;
