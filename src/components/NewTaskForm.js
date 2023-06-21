import React, { useState } from 'react';
import PropTypes from 'prop-types';

const NewTaskForm = ({ handleSubmit }) => {
  const [title, setName] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const newTask = {
      title,
      description: '',
      isComplete: false,
    };
    handleSubmit(newTask);

    setName('');
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <label htmlFor="title">Task title:</label>
      <input
        type="text"
        id="title"
        name="taskTitle"
        value={title}
        onChange={handleNameChange}
      />
      <input type="submit" value="Add a new task" />
    </form>
  );
};

NewTaskForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
  };
  
export default NewTaskForm;