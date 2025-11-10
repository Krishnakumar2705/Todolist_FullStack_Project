import React, { useState, useEffect } from "react";
import Create from "./Create";
import axios from "axios";
import { BsCircleFill, BsCheckCircleFill } from "react-icons/bs";
import { BsTrash } from "react-icons/bs";

function Home() {
  const [todos, setTodos] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

  const fetchTodos = () => {
    axios
      .get(`${API_URL}/get`)
      .then((result) => {
        console.log('Fetched todos:', result.data);
        if (Array.isArray(result.data)) {
          setTodos(result.data);
        } else {
          console.error('Expected array but got:', result.data);
          setTodos([]);
        }
      })
      .catch((err) => {
        console.error('Error fetching todos:', err);
        setTodos([]);
      });
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleEdit = (id) => {
    axios
      .put(`${API_URL}/update/${id}`)
      .then((result) => {
        fetchTodos();
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = (id) => {
    axios
      .delete(`${API_URL}/delete/${id}`)
      .then((result) => {
        console.log(result);
        fetchTodos();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="home">
      <h2>Todo List</h2>
      <Create onTaskAdded={fetchTodos} />
      {todos.length === 0 ? (
        <div>
          <h2>No Record</h2>
        </div>
      ) : (
        todos.map((todo) => (
          <div className="task" key={todo._id}>
            <div className="checkbox" onClick={() => handleEdit(todo._id)}>
              {todo.done ? (
                <BsCheckCircleFill className="icon" />
              ) : (
                <BsCircleFill className="icon" />
              )}
              <p className={todo.done ? "line_through" : ""}>{todo.task}</p>
            </div>
            <div>
              <span>
                <BsTrash className="icon" onClick={() => handleDelete(todo._id)} />
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Home;
