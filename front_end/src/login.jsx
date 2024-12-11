import { useState } from "react"

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle login logic here, e.g., send a request to the backend
        console.log('Logging in:', username, password);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" />
            <input type="password" />
            <button type="submit">Login</button>
        </form>
    );
};