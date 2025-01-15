import { useState } from "react";
import styles from './styles/LoginComponent.module.css'
import { useNavigate } from 'react-router-dom';
import api from './apiClient';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post('/user/login', {
                email,
                password,
            });

            if (response.status === 200) {
                const token = await response.json();
                localStorage.setItem("TOKEN", token);
                navigate('/home'); // Redirect to home page on successful login
            } else {
                console.error('Login failed:', response.statusText);
                // Handle login failure (e.g., display error message to user)
            }
        } catch (error) {
            console.error('Error logging in:', error);
            // Handle errors gracefully (e.g., display generic error message)
        }
    };

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.loginForm}>
                <h1 className={styles.logTitel}>Sisene ülessanete listi</h1>
                <div className={styles.loginContainer}>
                    <input
                        type="email"
                        placeholder="E-post"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={styles.usernameInput}
                    />
                    <input
                        type="password"
                        placeholder="Parool"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={styles.passwordInput}
                    />
                    <button className={styles.loginButton}>Sisene</button>
                    <button type="submit" className={styles.loginButton}>Registreeri</button>
                </div>
            </form>
        </div>
    );
}
