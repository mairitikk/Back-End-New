import { useState } from "react";
import styles from './styles/LoginComponent.module.css'
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { Link } from 'react-router-dom';


export default function Login() {
    const [email, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Send a POST request to your backend API
        try {
            const response = await fetch("http://localhost:3000/api/user/login/", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "email": email, "password": password })
            });

            if (response.ok) {
                const token = await response.json();

                // Handle successful login, e.g., store token, redirect
                //console.log('Login successful:', token);

                localStorage.setItem("TOKEN", token)


                navigate('/home');

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
                        type="email"
                        placeholder="E-post"
                        value={email}
                        onChange={(e) => setUsername(e.target.value)}
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



};

