/* eslint-disable react/prop-types */
export function TodoItem({ completed, id, title, toggleTodo, deleteTodo }) {
  return (
    <li className={completed ? "completed" : ""}>
      <label>
        <input
          type="checkbox"
          checked={completed}
          onChange={e => toggleTodo(id, e.target.checked)} // Pass updated completed state (true)
        />
        {title}
      </label>
      <button onClick={() => deleteTodo(id)} className="btn1">
        <img src="/src/assets/cross.png" title="delete button" alt="" />
      </button>
    </li>
  );
}