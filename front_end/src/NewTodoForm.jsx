/* eslint-disable react/prop-types */
import { useState } from "react"
import styles from "./styles/HomeComponent.module.css"

export function NewTodoForm({ onSubmit }) {
  const [newItem, setNewItem] = useState("")

  function handleSubmit(e) {
    e.preventDefault()
    if (newItem === "") return

    onSubmit(newItem)

    setNewItem("")
  }

  return (
    <form onSubmit={handleSubmit} className={styles.newTodoForm}>
      <div className={styles.formRow}>
        <label htmlFor="item">
          <h1 className={styles.todoTitle}>Lisa uus toimetus</h1>
        </label>
        <input
          className={styles.todoInput}
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          type="text"
          id="item"

        />
      </div>

      <button className={styles.addTodoBtn}>Lisa</button>

    </form>
  );
}