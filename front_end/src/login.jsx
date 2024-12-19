import { useState } from "react";
import styles from './styles/LoginComponent.module.css'
export default function Login() {
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
        <div className={styles.container}>
            
            
        <form onSubmit={handleSubmit} className={styles.loginForm}>
            <h1 className={styles.logTitel}>Sisene ülessanete listi</h1>
            <div className={styles.loginContainer}>
                <input
                    type="text"
                    placeholder="Kasutajanimi"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className={styles.usernameInput}
                />
                <input
                    type="password"
                    placeholder="Salasõna"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={styles.passwordInput}
                />
                <button type="submit" className={styles.loginButton}>Sisene</button>
            </div>
        </form>
        </div>
    );



};

