import { useEffect, useState } from "react"
import { NewTodoForm } from "./NewTodoForm"
import "./styles.css"
import { TodoList } from "./TodoList"

export default function App() {
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("ITEMS")
    
    // llamar API para tener todos los valores
    // fetch('https://dummyjson.com/todos')
    //.then(res => res.json())
    //.then(console.log);
    
    if (localValue == null) return []
    
    return JSON.parse(localValue)
  })

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos))
  }, [todos])

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