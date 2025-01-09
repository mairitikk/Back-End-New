/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

import styles from './styles/RegistrationComponent.module.css'

function RegistrationForm() {
    const [formData, setFormData] = useState({
        name: '',
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

//POST 

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (formData.password !== formData.repeatPassword) {
      alert('Passwords do not match!');
      return;
    }

    // Handle form submission, e.g., send data to server
    console.log('Registration data:', formData);

  try {
    const response = await fetch("http://localhost:3000/api/user/register/", { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        "name": formData.name, 
        "email": formData.email, 
        "password": formData.password 
      })
    });

    if (response.ok) {
      // Handle successful registration, e.g., display success message, redirect
      console.log('Registration successful!');
      // Optionally, provide feedback to the user (e.g., success message)
      alert('Registration successful! You can now login.'); 
      // Redirect to login page after successful registration
      navigate('/login'); 
    } else {
      // Handle registration failure, e.g., display error message
      const errorData = await response.json(); // Try to get error details from the server
      console.error('Registration failed:', errorData.message || response.statusText);
      // Display error message to the user
      alert('Registration failed. Please check the entered data.'); 
    }
  } catch (error) {
    console.error('Error registering:', error);
    // Display a general error message to the user
    alert('An error occurred during registration. Please try again later.'); 
  }
};


    /*Password validation
  
 */
return (  
    <div  className={styles.container}>
        <form onSubmit={handleSubmit}>
            <div className={styles.registratonContainer}>
            
                <label htmlFor="name" className={styles.label} >Nimi:</label>
                <input
                className={styles.registrationForm}
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
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
           
            <button type="submit" className={styles.registrationButton}>Registreeri</button>
       </div>
        </form>
        </div>
    );
}

export default RegistrationForm;