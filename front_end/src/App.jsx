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

  async function insertTodo(todoData) {
    try {
      const response = await fetch('http://localhost:3000/api/todo/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(todoData)


      });

      if (!response.ok) {
        throw new Error(`Failed to insert todo: ${response.status}`);
      }

      const newTodo = await response.json();
      return newTodo;
    } catch (error) {
      console.error('Error inserting todo:', error);
      throw error; // Or handle the error appropriately, e.g., display an error message
    }
  }
  async function deleteTodo(id) {
    try {
      const response = await fetch(`http://localhost:3000/api/todo/${parseInt(id)}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error(`Failed to delete todo: ${response.status}`);
      }

      setTodos(currentTodos => currentTodos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
      // Optionally, display an error message to the user
    }
  }


  function addTodo(title) {
    const newTodo = { id: crypto.randomUUID(), title, completed: false };

    setTodos(currentTodos => [...currentTodos, newTodo]);

    // Call insertTodo and handle the promise
    insertTodo(newTodo)
      .then(responseTodo => {
        console.log("New todo created:", responseTodo);
        // Update local state again if server response includes new information (optional)
      })
      .catch(error => {
        console.error("Error creating todo:", error);
        // Optionally, remove the new todo from the local state if creation fails
        // and display an error message to the user
      });
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