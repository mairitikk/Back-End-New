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

    return [];
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
  }, []);

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
      throw error;
    }
  }
  async function deleteTodo(id) {
    try {
      const response = await fetch(`http://localhost:3000/api/todo/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error(`Failed to delete todo: ${response.status}`);
      }


      setTodos(currentTodos => currentTodos.filter(todo => todo.id !== id));

      console.log("Todo deleted successfully!");
    } catch (error) {
      console.error("Error deleting todo:", error);

    }
  }
  async function updateTodo(id, completed, title) {
    try {
      const response = await fetch(`http://localhost:3000/api/todo/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id, title, completed }) // Send entire todo object with updated completed
      });

      if (!response.ok) {
        throw new Error(`Failed to update todo: ${response.status}`);
      }

      const updatedTodo = await response.json();
      setTodos(currentTodos => currentTodos.map(todo => todo.id === id ? updatedTodo : todo));
      return updatedTodo;
    } catch (error) {
      console.error('Error updating todo:', error);
      throw error;
    }
  }


  function addTodo(title) {
    const newTodo = { id: crypto.randomUUID(), title, completed: false };

    setTodos(currentTodos => [...currentTodos, newTodo]);


    insertTodo(newTodo)
      .then(responseTodo => {
        console.log("New todo created:", responseTodo);

      })
      .catch(error => {
        console.error("Error creating todo:", error);

      });
  }

  function toggleTodo(id, completed) {
    const currentTodo = todos.find(todo => todo.id === id); // Find todo by id

    setTodos(currentTodos => currentTodos.map(todo => {
      if (todo.id === id) {
        return { ...todo, completed }; // Update completed state locally
      }
      return todo;
    }));

    if (currentTodo) { // Check if todo found
      updateTodo(id, completed, currentTodo.title) // Pass title from currentTodo
        .then(updatedTodo => {
          console.log("Todo updated successfully:", updatedTodo);
        })
        .catch(error => {
          console.error("Error updating todo:", error);
        });
    } else {
      console.error("Todo not found:", id); // Handle missing todo
    }
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