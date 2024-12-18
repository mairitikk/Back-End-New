import styles from './styles/HomeComponent.module.css';
import { NewTodoForm } from "./NewTodoForm";
import { TodoList } from "./TodoList";

function HomeComponent({ todos, addTodo, toggleTodo, deleteTodo }) {
    return (
        <div className={styles.container}>
            <div className={styles.loginContainer}>
                <div className="button-container">
                    <button className="btn-r">Sisene</button>
                    <button className="btn-r">Registreeri</button>
                </div>
                <div className="form-container">
                    <NewTodoForm onSubmit={addTodo} />
                </div>
            </div>
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
    );
}
export default HomeComponent
