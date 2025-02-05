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
    const [errorMessage, setErrorMessage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage(null);

        // Create an empty object to store validation errors
        const newErrors = {};

        // Validate email
        if (!email) {
            newErrors.email = t('emailRequired');
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = t('invalidEmailFormat');
        }

        // Validate password
        if (!password) {
            newErrors.password = t('passwordRequired');
        } else if (password.length < 6) {
            newErrors.password = t('passwordLength');
        }

        // Display validation errors (if any)
        if (Object.keys(newErrors).length > 0) {
            let errorMessage = t('validationErrors') + '\n';
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

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem("TOKEN", data.token);

                navigate('/home');
            } else {
                const errorData = await response.json(); // Try to parse error details from server
                let message;

                if (errorData && errorData.message) {
                    message = errorData.message; // Display server-specific message if available
                } else if (response.status === 401) {
                    message = t('incorrectCredentials'); // Generic message for unauthorized access
                } else if (response.status === 400) {
                    message = t('badRequest'); // Generic message for bad request
                }
                else {
                    message = t('loginFailed'); // Default generic error message
                }

                setErrorMessage(message); // Set the error message to display
            }
        } catch (error) {
            console.error('Login error:', error);
            setErrorMessage(t('loginFailed')); // Set a generic error message
        }
    };



    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.loginForm}>
                <h1 className={styles.logTitel}>{t('loginTitle')}</h1>
                {errorMessage && ( // Conditionally render the error message
                    <div className={styles.errorMessage}>
                        {errorMessage}
                    </div>
                )}
                <div className={styles.loginContainer}>
                    <input
                        type="email"
                        placeholder={t('emailPlaceholder')}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={styles.usernameInput}
                    />
                    <input
                        type="password"
                        placeholder={t('passwordPlaceholder')}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={styles.passwordInput}
                    />
                    <div className={styles.buttonContainer}>
                        <button type="submit" className={styles.loginButton}>{t('loginButton')}</button>
                    </div>
                    <div>
                        <p className={styles.linkText}>{t('noAccountYet')}</p>
                        <Link to="/register" className={styles.link}>{t('registerHere')}</Link>
                    </div>

                </div>
            </form>
        </div>
    );
}
