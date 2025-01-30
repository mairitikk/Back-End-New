import { useState } from 'react';
import styles from './styles/RegistrationComponent.module.css';
import { useNavigate } from 'react-router-dom';

function RegistrationForm() {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const navigate = useNavigate();
  const [repeatPassword] = useState();

  const [errors, setErrors] = useState({}); // Object to store field-specific errors

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value.trim(), // Trim whitespace
    });


  };

  const validateForm = () => {  // New function to validate all fields
    const newErrors = {};
    newErrors.name = formData.name ? "" : "Nimi on vajalik";
    newErrors.email = formData.email ? "" : "Email on vajalik";
    if (!formData.password) {
      newErrors.password = "Parool on vajalik";
    } else if (formData.password.length < 6) {
      newErrors.password = "Parool peab olema vähemalt 6 tähte pikk";
    } else {
      newErrors.password = "";
    }

    newErrors.repeatPassword = formData.repeatPassword ? "" : "Parooli kordamine on vajalik";
    if (formData.password != formData.repeatPassword) {
      newErrors.repeatPassword = "Paroolid ei ole ühesugused";
    } else {
      newErrors.repeatPassword = "";
    }

    setErrors(newErrors);
    return Object.values(newErrors).every(error => error === ""); // Return true if no errors
  };




  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = validateForm();
    if (isValid) {

      try {

        const response = await fetch('http://localhost:3000/api/user/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem('TOKEN') ? `Bearer ${localStorage.getItem('TOKEN')}` : undefined, // Include authorization header only if a token exists in localStorage
          },
          body: JSON.stringify(formData),

        });

        console.log('Form data:', formData);

        if (response.ok) {
          console.log('Registration successful!');
          // Show success message to user (consider clearing form or redirecting)
          navigate('/');
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
                value={repeatPassword}
                onChange={handleChange}
              />
              {errors.repeatPassword && <p className={styles.error}>{errors.repeatPassword}</p>}
            </div>
          </div>
          <div className={styles.registrationButtonDirection}>
            <button type="submit" className={styles.registrationButton}>
              Registreeri
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;