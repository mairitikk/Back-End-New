/* eslint-disable react/prop-types */

import styles from "./styles/HomeComponent.module.css";
import { TodoItem } from "./TodoItem";
import { useState, useEffect } from "react";

export function TodoList({ id, toggleTodo }) {
  const [todos, setTodos] = useState([]);

  // Fetch todo list from storage based on id on component mount
  useEffect(() => {
    const fetchTodos = async () => {
      const storedTodos = await loadTodosFromStorage(id);
      setTodos(storedTodos);
    };
    fetchTodos();
  }, [id]);

  const saveTodos = async (newTodos) => {
    await storeTodosInStorage(id, newTodos);
    setTodos(newTodos);
  };

  function loadTodosFromStorage(id) {
    const storedTodos = localStorage.getItem(`todos-${id}`);
    if (storedTodos) {
      return JSON.parse(storedTodos);
    }
    return [];
  }

  function storeTodosInStorage(id, todos) {
    localStorage.setItem(`todos-${id}`, JSON.stringify(todos));
  }
  function handleAddTodo(newTodo) {
    setTodos([...todos, newTodo]);
    saveTodos([...todos, newTodo]); // Call saveTodos to persist the new list
  }

  function handleEditTodo(editedTodo) {
    const updatedTodos = todos.map((todo) => (todo.id === editedTodo.id ? editedTodo : todo));
    setTodos(updatedTodos);
    saveTodos(updatedTodos); // Call saveTodos to persist the updated list
  }

  function handleDeleteTodo(todoId) {
    const filteredTodos = todos.filter((todo) => todo.id !== todoId);
    setTodos(filteredTodos);
    saveTodos(filteredTodos); // Call saveTodos to persist the filtered list
  }

  return (
    <ul className={styles.list}>
      {/* ... */}
      <input type="text" placeholder="Add a todo" onKeyDown={(event) => {
        if (event.key === 'Enter') {
          const newTodo = { id: Date.now(), text: event.target.value };
          handleAddTodo(newTodo); // Call the prop function to add a todo
          event.target.value = "";
        }
      }} />
      {todos.map((todo) => (
        <TodoItem
          {...todo}
          key={todo.id}
          toggleTodo={toggleTodo}
          deleteTodo={() => handleDeleteTodo(todo.id)} // Call the prop function with id
          onEdit={(editedTodo) => handleEditTodo(editedTodo)} // New prop for editing
        />
      ))}
    </ul>
  );
}