import React, {useState} from 'react';
import TaskList from './components/TaskList.js';
import './App.css';

const TASKS = [
  {
    id: 1,
    title: 'Mow the lawn',
    isComplete: false,
  },
  {
    id: 2,
    title: 'Cook Pasta',
    isComplete: true,
  },
];

const App = () => {
  //Checking
  const[taskData, setTaskData] = useState(TASKS);
  const updatedTaskData = updatedTask => {
    const tasks = taskData.map(task => {
      if(task.id === updatedTask.id){
        return updatedTask;
      } else{
        return task;
      }
    });
    setTaskData(tasks);
  };
  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div><TaskList tasks={taskData}
           onUpdateTask={updatedTaskData} /></div>
      </main>
    </div>
  );
};

export default App;
