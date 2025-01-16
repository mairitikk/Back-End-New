import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import HomeComponent from './HomeComponent';


/*async function fetchTodos() {
    try {
        const response = await fetch('http://localhost:3000/api/todo/');
        if (!response.ok) throw new Error(`Failed to fetch todos: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error("Error fetching todos:", error);
        return [];
    }
}*/

export default function App() {

    const navigate = useNavigate();

    const [todos, setTodos] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("TOKEN");
                if (!token) {
                    return navigate('/');
                }

                const response = await fetch('http://localhost:3000/api/todo/', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    if (response.status === 401) {
                        // Handle 401 Unauthorized (e.g., redirect to login)
                        console.error("Unauthorized access to todos.");
                        navigate('/login');
                        return;
                    } else {
                        throw new Error(`Failed to fetch todos: ${response.status} ${response.statusText}`);
                    }
                }

                const fetchedTodos = await response.json();
                setTodos(fetchedTodos);
            } catch (error) {
                console.error('Error fetching todos:', error);
            }
        };

        fetchData();
    }, []);

    const insertTodo = async (todoData) => {
        try {
            const token = localStorage.getItem("TOKEN");
            if (!token) {
                return navigate('/');
            }

            const response = await fetch('http://localhost:3000/api/todo/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
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
    };



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
                body: JSON.stringify({ completed, title }) // Only send the updated completed state
            });

            if (!response.ok) {
                throw new Error(`Failed to update todo: ${response.status}`);
            }

            // No need to update the entire todo object, update local state directly
            setTodos(currentTodos =>
                currentTodos.map(todo => (todo.id === id ? { ...todo, completed } : todo))
            );

            console.log("Todo updated successfully:", { completed });

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

        // Update local state for immediate UI feedback
        setTodos(currentTodos =>
            currentTodos.map(todo => (todo.id === id ? { ...todo, completed } : todo))
        );

        if (currentTodo) { // Check if todo found
            updateTodo(id, completed, currentTodo.title) // Pass only completed for update
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
        <div>
            <HomeComponent todos={todos}
                addTodo={addTodo}
                toggleTodo={toggleTodo}
                deleteTodo={deleteTodo} ></HomeComponent>
        </div>

    )

}
