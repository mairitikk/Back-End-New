
import React, { useState } from 'react';

import styles from './styles/RegistrationComponent.module.css';

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
        } else if (fieldValue !== formData.password) {
          newErrors.repeatPassword = 'Passwords do not match.';
        }
        break;
      default:
        break;
    }

    return newErrors;
  };

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
      console.log('Registration data:', formData);

      // ... rest of your form submission logic (e.g., send data to server)
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <div className={styles.registrationContainer}>
          <label htmlFor="name" className={styles.label}>
            Nimi:
          </label>
          <input
            className={styles.registrationForm}
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p className={styles.error}>{errors.name}</p>}

          <label htmlFor="email" className={styles.label}>
            E-post:
          </label>
          <input
            className={styles.registrationForm}
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className={styles.error}>{errors.email}</p>}

          <label htmlFor="password" className={styles.label}>
            Parool:
          </label>
          <input
            className={styles.registrationForm}
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p className={styles.error}>{errors.password}</p>}

          <label htmlFor="repeatPassword" className={styles.label}>Korda parooli</label>
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