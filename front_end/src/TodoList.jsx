/* eslint-disable react/prop-types */
import styles from "./styles/HomeComponent.module.css";
import { TodoItem } from "./TodoItem";
import { useState, useEffect } from "react";

export function TodoList({ id, toggleTodo, deleteTodo }) {
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

  return (
    <ul className={styles.list}>
      {todos.length === 0 && "Pole ülessandeid"}
      {todos.map((todo) => (
        <TodoItem
          {...todo}
          key={todo.id}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
        />
      ))}
    </ul>
  );
}