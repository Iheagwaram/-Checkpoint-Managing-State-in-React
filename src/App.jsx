import React, { useState, useEffect } from "react";
import "./App.css";

const TaskForm = ({ addTask }) => {
  const [task, setTask] = useState({ name: "", description: "" });

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.name || !task.description) return;
    addTask(task);
    setTask({ name: "", description: "" });
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Task Name"
        value={task.name}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="description"
        placeholder="Task Description"
        value={task.description}
        onChange={handleChange}
        required
      />
      <button type="submit" className="add-btn">Add Task</button>
    </form>
  );
};

const TaskItem = ({ task, index, completeTask, deleteTask, editTask }) => {
  return (
    <div className={`task ${task.completed ? "completed" : ""}`}>
      <h3>{task.name}</h3>
      <p>{task.description}</p>
      <div className="task-buttons">
        <button className="complete-btn" onClick={() => completeTask(index)}>Complete</button>
        <button className="edit-btn" onClick={() => editTask(index)}>Edit</button>
        <button className="delete-btn" onClick={() => deleteTask(index)}>Delete</button>
      </div>
    </div>
  );
};

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    setTasks([...tasks, { ...task, completed: false }]);
  };

  const completeTask = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  const deleteTask = (index) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setTasks(tasks.filter((_, i) => i !== index));
    }
  };

  const editTask = (index) => {
    const newName = prompt("Enter new task name:", tasks[index].name);
    const newDescription = prompt(
      "Enter new task description:",
      tasks[index].description
    );
    if (newName && newDescription) {
      const newTasks = [...tasks];
      newTasks[index] = { ...newTasks[index], name: newName, description: newDescription };
      setTasks(newTasks);
    }
  };

  return (
    <div>
      <TaskForm addTask={addTask} />
      <div className="task-list">
        {tasks.map((task, index) => (
          <TaskItem
            key={index}
            task={task}
            index={index}
            completeTask={completeTask}
            deleteTask={deleteTask}
            editTask={editTask}
          />
        ))}
      </div>
    </div>
  );
};

const App = () => {
  return (
    <div className="app">
      <h1>To-Do List</h1>
      <TaskList />
    </div>
  );
};

export default App;
