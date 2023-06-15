import React from 'react';
import PropTypes from 'prop-types';

import './Task.css';

const Task = ({ id, title, isComplete, onUpdate}) => {
  //const [complete, setComplete] = useState(isComplete);
  const onTaskToggle = () => {
    console.log("task Toggled!");
    const updatedTask = {
      id: id,
      title: title,
      isComplete: !isComplete,
    };
    onUpdate(updatedTask);
  };
  console.log("isComplete value in Task.js", isComplete);
  const buttonClass = isComplete ? 'tasks__item__toggle--completed' : '';

  return (
    <li className="tasks__item">
      <button
        className={`tasks__item__toggle ${buttonClass}`}
        onClick={onTaskToggle}
      >
        {title}
      </button>
      <button className="tasks__item__remove button">x</button>
    </li>
  );
};

Task.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  isComplete: PropTypes.bool.isRequired,
  onUpdate: PropTypes.func.isRequired
};

export default Task;
