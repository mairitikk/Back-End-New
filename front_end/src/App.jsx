import { useEffect, useState } from "react"
import { NewTodoForm } from "./NewTodoForm"
import "./styles.css"
import { TodoList } from "./TodoList"

async function fetchTodos() {
  try {
    const response = await fetch('http://localhost:3000/api/todo/');
    if (!response.ok) throw new Error(`Failed to fetch todos: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching todos:", error);
    // Handle error, e.g., display an error message to the user
    return []; // Or set a loading state
  }
}

export default function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedTodos = await fetchTodos();
      setTodos(fetchedTodos);
    };

    fetchData();
  }, []); // Empty dependency array to run only once

  console.log(todos);

  function addTodo(title) {
    setTodos(currentTodos => {
      return [
        ...currentTodos,
        { id: crypto.randomUUID(), title, completed: false },
      ]
    })
  }

  function toggleTodo(id, completed) {
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        if (todo.id === id) {
          return { ...todo, completed }
        }

        return todo
      })
    })
  }

  function deleteTodo(id) {
    setTodos(currentTodos => {
      return currentTodos.filter(todo => todo.id !== id)
    })
  }

  return (
    <div className="container">
      <NewTodoForm onSubmit={addTodo} />
      <div>
        <h1 className="header">
          <span>Ü</span>
          <span>l</span>
          <span>e</span>
          <span>s</span>
          <span>a</span>
          <span>n</span>
          <span>d</span>
          <span>e</span>
          <span>d</span>
        </h1>
        <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
      </div>
    </div>
  )
}