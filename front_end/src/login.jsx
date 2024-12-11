import { useState } from "react";

export
    const LoginForm = () => {
        const [username, setUsername] = useState('');
        const [password, setPassword] = useState('');

        const handleSubmit = async (e) => {
            e.preventDefault();

            // Send a POST request to your backend API
            try {
                const response = await fetch('/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username, password })
                });

                if (response.ok) {
                    const data = await response.json();
                    // Handle successful login, e.g., store token, redirect
                    console.log('Login successful:', data);
                } else {
                    // Handle login failure, e.g., display error message
                    console.error('Login failed:', response.statusText);
                }
            } catch (error) {
                console.error('Error logging in:', error);
            }
        };

        return (
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
            </form>
        );
    };
