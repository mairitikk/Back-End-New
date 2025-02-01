import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import HomeComponent from './HomeComponent';
import LogoutComponent from './LogoutComponent';




async function fetchTodos(token) {
    try {
        const response = await fetch('http://localhost:3000/api/todo/', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) throw new Error(`Failed to fetch todos: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error("Error fetching todos:", error);
        return [];
    }
}

export default function App() {

    const navigate = useNavigate();

    const [todos, setTodos] = useState([]);

    const fetchData = async () => {

        // Check for local storage data
        const tokenValue = localStorage.getItem("TOKEN");
        //console.log("Token retrieved from localStorage:", tokenValue);
        if (!tokenValue) {
            return navigate('/');
        }

        const fetchedTodos = await fetchTodos(tokenValue);
        setTodos(fetchedTodos);
    };

    useEffect(() => {
        fetchData();
    }, []);


    const insertTodo = async (title) => {
        try {
            const token = localStorage.getItem("TOKEN");
            console.log("Retrieved token:", token);
            if (!token) {
                return navigate('/');
            };

            const response = await fetch('http://localhost:3000/api/todo/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ title })

            });

            if (!response.ok) {
                throw new Error(`Failed to insert todo: ${response.status}`);
            }

            const newTodo = await response.json();

            fetchData();

            return newTodo;
        } catch (error) {
            console.error('Error inserting todo:', error);
            throw error;
        }
    };

    async function deleteTodo(id) {
        try {
            const token = localStorage.getItem("TOKEN");
            console.log(token);
            if (!token) {
                return navigate('/'); // Redirect if no token found
            }

            const response = await fetch(`http://localhost:3000/api/todo/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Include token in authorization header
                }
            });
            console.log(response)

            if (!response.ok) {
                throw new Error(`Failed to delete todo: ${response.status}`);
            }

            setTodos(currentTodos => currentTodos.filter(todo => todo.id !== id));
            console.log("Todo deleted successfully!");
            console.log(setTodos)
        } catch (error) {
            console.error("Error deleting todo:", error);
            // Inform user about the error
            alert("Failed to delete todo. Please try again later.");
        }
    }


    async function updateTodo(id, completed, title) {
        const token = localStorage.getItem("TOKEN");
        if (!token) {
            return navigate('/');
        }
        try {
            const userId = localStorage.getItem('userId');
            const response = await fetch(`http://localhost:3000/api/todo/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ completed, title, user_id: userId }) // Only send the updated completed state
            });

            if (!response.ok) {
                throw new Error(`Failed to update todo: ${response.status}`);
            }

            // Update local state using find and spread operator
            setTodos(currentTodos => {
                const updatedTodos = [...currentTodos]; // Create a copy of the array
                const indexToUpdate = updatedTodos.findIndex(todo => todo.id === id);

                if (indexToUpdate !== -1) {
                    updatedTodos[indexToUpdate] = { ...updatedTodos[indexToUpdate], completed };
                }

                return updatedTodos;
            });
            console.log("Todo updated successfully:", { completed });
        } catch (error) {
            console.error('Error updating todo:', error);
            throw error;
        }
    }


    function toggleTodo(id, completed) {
        const currentTodo = todos.find(todo => todo.id === id);

        if (currentTodo) {
            updateTodo(id, completed, currentTodo.title)
                .then(updatedTodo => {
                    console.log("Todo updated successfully:", updatedTodo);
                    // Update state after successful server update
                    setTodos(prevTodos =>
                        prevTodos.map(todo => (todo.id === id ? { ...todo, completed } : todo))
                    );
                })
                .catch(error => {
                    console.error("Error updating todo:", error);
                });
        } else {
            console.error("Todo not found:", id);
        }
    }

    return (
        <div>

            <LogoutComponent></LogoutComponent>


            <HomeComponent todos={todos}
                addTodo={insertTodo}
                toggleTodo={toggleTodo}
                deleteTodo={deleteTodo} >
            </HomeComponent>



        </div>


    )

}
