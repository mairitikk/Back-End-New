/* eslint-disable react/prop-types */
import styles from "./styles/HomeComponent.module.css"
import { TodoItem } from "./TodoItem"
import { useState, useEffect } from "react"

export function TodoList({ todos, toggleTodo, deleteTodo }) {
  return (


    <ul className={styles.list}>
      {todos.length === 0 && "Pole ülessandeid"}
      {todos.map(todo => {
        return (
          <TodoItem
            {...todo}
            key={todo.id}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
          />
        )
      })}
    </ul>
  )
}