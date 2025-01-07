/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

import styles from './styles/RegistrationComponent.module.css'

function RegistrationForm() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        repeatPassword: '',
    });

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission, e.g., send data to server
        console.log(formData);
        // Clear form after submission
        setFormData({
            username: '',
            email: '',
            password: '',
        });
    };

    return (  <div  className={styles.container}>
        <form onSubmit={handleSubmit}>
            <div className={styles.registratonContainer}>
            
                <label htmlFor="username" className={styles.label} >Kasutajanimi:</label>
                <input
                className={styles.registrationForm}
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                />
           
                <label htmlFor="email" className={styles.label} >E-post:</label>
                <input className={styles.registrationForm}
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />
         
                <label htmlFor="password" className={styles.label} >Parool:</label>
                <input className={styles.registrationForm}
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                />
                
                <label htmlFor="password" className={styles.label} > Korda parooli:</label>
                <input className={styles.registrationForm}
                    type="password"
                    id="repeatpassword"
                    name="repeatpassword"
                    value={formData.repeatpassword}
                    onChange={handleChange}
                />
           
            <button type="submit" className={styles.registrationButton}>Register</button>
       </div>
        </form>
        </div>
    );
}

export default RegistrationForm;