/* eslint-disable react/prop-types */
import styles from "./styles/HomeComponent.module.css"
import { NewTodoForm } from "./NewTodoForm";
import { TodoList } from "./TodoList";



function HomeComponent({ todos, addTodo, toggleTodo, deleteTodo }) {
    return (
        <div className={styles.container}>


            <div className={styles.formContainer}>
                <NewTodoForm onSubmit={addTodo} />
            </div>

            <div>
                <h1 className={styles.header}>
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
    );
}

export default HomeComponent;