/* eslint-disable react/prop-types */
import styles from "./styles/HomeComponent.module.css"
export function TodoItem({ completed, id, title, toggleTodo, deleteTodo }) {
  const todoItemClass = completed ? styles.completed : ""; // Dynamically define class

  return (
    <li className={styles.todoItemClass}>
      <label>
        <input
          type="checkbox"
          checked={completed}
          onChange={e => toggleTodo(id, e.target.checked)} // Pass updated completed state (true)
        />
        {title}
      </label>
      <button onClick={() => deleteTodo(id)} className={styles.btn1}>
        <img src="/src/assets/cross.png" title="delete button" alt="" />
      </button>
    </li>
  );
}