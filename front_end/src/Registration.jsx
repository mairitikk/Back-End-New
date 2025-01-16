/* eslint-disable no-unused-vars */

import React, { useState } from 'react';

import styles from './styles/RegistrationComponent.module.css';
import { useNavigate } from 'react-router-dom';

function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    repeatPassword: '',
  });

  const [errors, setErrors] = useState({}); // Object to store field-specific errors

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value.trim(), // Trim whitespace
    });

    // Validate individual fields on change
    const updatedErrors = validateField(event.target.name, event.target.value);
    setErrors({ ...errors, ...updatedErrors }); // Update errors object
  };


  const validateField = (fieldName, fieldValue) => {
    const newErrors = {};

    switch (fieldName) {
      case 'name':
        if (!fieldValue) {
          newErrors.name = 'Name is required.';
        }
        break;
      case 'email':
        if (!fieldValue) {
          newErrors.email = 'Email is required.';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fieldValue)) {
          newErrors.email = 'Invalid email format.';
        }
        break;
      case 'password':
        if (!fieldValue) {
          newErrors.password = 'Password is required.';
        } else if (fieldValue.length < 6) {
          newErrors.password = 'Password must be at least 6 characters long.';
        }
        break;
      case 'repeatPassword':
        if (!fieldValue) {
          newErrors.repeatPassword = 'Repeat password is required.';
        } else if (fieldValue !== fieldValue) { // Use the current fieldValue
          newErrors.repeatPassword = 'Passwords do not match.';
        }
        break;
      default:
        break;
    }

    return newErrors;
  };
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields before submission
    const allErrors = validateField('name', formData.name);
    allErrors.email = validateField('email', formData.email).email;
    allErrors.password = validateField('password', formData.password).password;
    allErrors.repeatPassword = validateField('repeatPassword', formData.repeatPassword).repeatPassword;
    setErrors({ ...errors, ...allErrors }); // Update errors object

    // Submit form only if there are no errors
    if (Object.keys(errors).length === 0) {
      try {
        // Fetch with potential authorization header
        const response = await fetch('http://localhost:3000/api/user/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem('TOKEN') ? `Bearer ${localStorage.getItem('TOKEN')}` : undefined, // Include authorization header only if a token exists in localStorage
          },
          body: JSON.stringify(formData),

        }); console.log('Form data:', formData);

        if (response.ok) {
          console.log('Registration successful!');
          // Show success message to user (consider clearing form or redirecting)
          setFormData({ name: '', email: '', password: '' }); // Clear form data
        } else {
          console.error('Registration failed:', await response.text());
          // Display error message to user (e.g., set appropriate errors state)
        }
      } catch (error) {
        console.error('Error during registration:', error);
        // Handle network errors or other unexpected issues
      }
    }
  };
  const handleRegisterClick = () => {
    navigate('/home');
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <h1 className={styles.logTitel}>Registreeri ülessanete listi</h1>
        <div className={styles.registrationContainer}>
          <div className={styles.formRow}>
            <label htmlFor="name" className={styles.label}>
              Nimi:
            </label>
            <div className={styles.fieldContainer}>
              <input
                className={styles.registrationForm}
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <p className={styles.error}>{errors.name}</p>}
            </div>
          </div>

          <div className={styles.formRow}>
            <label htmlFor="email" className={styles.label}>
              E-post:
            </label>
            <div className={styles.fieldContainer}>
              <input
                className={styles.registrationForm}
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <p className={styles.error}>{errors.email}</p>}
            </div>
          </div>

          <div className={styles.formRow}>
            <label htmlFor="password" className={styles.label}>
              Parool:
            </label>
            <div className={styles.fieldContainer}>
              <input
                className={styles.registrationForm}
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && <p className={styles.error}>{errors.password}</p>}
            </div>
          </div>

          <div className={styles.formRow}>
            <label htmlFor="repeatPassword" className={styles.label}>
              Korda parooli:
            </label>
            <div className={styles.fieldContainer}>
              <input
                className={styles.registrationForm}
                type="password"
                id="repeatPassword"
                name="repeatPassword"
                value={formData.repeatPassword}
                onChange={handleChange}
              />
              {errors.repeatPassword && <p className={styles.error}>{errors.repeatPassword}</p>}
            </div>
          </div>
          <div className={styles.registrationButtonDirection}>
            <button type="submit" className={styles.registrationButton} onClick={handleRegisterClick}>
              Registreeri
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;