/* eslint-disable react/prop-types */
export function TodoItem({ completed, id, title, toggleTodo, deleteTodo }) {
  return (
    <li>
      <label>
        <input
          type="checkbox"
          checked={completed}
          onChange={e => toggleTodo(id, e.target.checked)}
        />
        {title}
      </label>
      <button onClick={() => deleteTodo(id)} className="btn1">
        <img src="/src/assets/cross.png" alt="" />
      </button>
    </li>
  )
}