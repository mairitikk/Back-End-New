import { useState } from "react";
import styles from './styles/LoginComponent.module.css'
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { t } = useTranslation();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create an empty object to store validation errors
        const newErrors = {};

        // Validate email
        if (!email) {
            newErrors.email = 'Epost on vajalik';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = 'Vale eposti formaat';
        }

        // Validate password
        if (!password) {
            newErrors.password = 'Parool on vajalik';
        } else if (password.length < 6) {
            newErrors.password = 'Parool peab olema vähemalt kuus tähte pikk';
        }

        // Display validation errors (if any)
        if (Object.keys(newErrors).length > 0) {
            let errorMessage = 'Palun paranda järgnevad vead:\n';
            for (const errorField in newErrors) {
                errorMessage += `- ${newErrors[errorField]}\n`;
            }
            alert(errorMessage);
            return; // Exit the function if there are validation errors
        }

        // Proceed with login if all fields are valid
        try {
            const bodyData = { email: email, password: password };
            const response = await fetch('http://localhost:3000/api/user/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bodyData)
            });

            if (response.status === 200) {
                console.log('Login successful:', response);

                //optener token y guardar en variable localStorage
                const data = await response.json();
                localStorage.setItem("TOKEN", data.token);

                navigate('/home');
            } else {
                // Handle login errors (e.g., display error message)
            }
        } catch (error) {
            console.error('Login error:', error);
            // Handle login errors
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
                    <div className={styles.buttonContainer}>
                        <button type="submit" className={styles.loginButton}>Sisene</button>
                    </div>
                    <div>
                        <p className={styles.linkText}>Pole veel kasutajat?</p>
                        <Link to="/register" className={styles.link}>Registreeri siin</Link>
                    </div>

                </div>
            </form>
        </div>
    );
}
