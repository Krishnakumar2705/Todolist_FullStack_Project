import React from 'react';
import { useState } from 'react';
import axios from 'axios';

function Create({ onTaskAdded }) {
  const [task, setTask] = useState('')
  const handleAdd = () =>{
    if (!task) return;
    axios.post('http://localhost:3001/add', {task: task})
    .then(result => {
      console.log(result);
      setTask('');
      if (onTaskAdded) onTaskAdded();
    })
    .catch(err => console.log(err))

  }
  return (
    <div className="create_form">
      <input type="text" placeholder='Enter Task' value={task} onChange={(e) => setTask(e.target.value)} />
      <button type='button' onClick={handleAdd}>Add</button>
    </div>
  );
}

export default Create;
