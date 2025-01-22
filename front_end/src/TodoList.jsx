/* eslint-disable react/prop-types */
import styles from "./styles/HomeComponent.module.css";
import { TodoItem } from "./TodoItem";

export function TodoList({ todos, toggleTodo, deleteTodo, emptyListMessage = "No todos" }) {
  return (
    <ul className={styles.list}>
      {todos ? (
        todos.length === 0 ? (
          <li>{emptyListMessage}</li>
        ) : (
          todos.map((todo) => (
            <TodoItem
              {...todo}
              key={todo.id}
              toggleTodo={toggleTodo}
              deleteTodo={deleteTodo}
            />
          ))
        )
      ) : (
        <li>Loading todos...</li>
      )}
    </ul>
  );
}