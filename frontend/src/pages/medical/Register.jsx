import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import patternImage from '../medical/log1.png'; // Ensure the path to the image is correct

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/register", { name, email, password })
      .then(result => {
        console.log(result);
        navigate("/login");
      })
      .catch(err => console.log(err));
  };

  const styles = {
    page: {
      display: 'flex',
      height: '100vh',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f4f4f4',
    },
    leftPanel: {
      flex: 1,
      padding: '3rem',
      backgroundColor: 'white',
      borderRadius: '10px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
      maxWidth: '450px',
      marginRight: '20px',
    },
    logo: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      color: '#007bff',
      textAlign: 'center',
      marginBottom: '20px',
    },
    welcomeText: {
      fontSize: '1.2rem',
      color: '#555',
      marginBottom: '30px',
      textAlign: 'center',
    },
    inputField: {
      width: '100%',
      padding: '12px',
      fontSize: '1rem',
      marginBottom: '20px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      backgroundColor: '#f9f9f9',
      boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)',
      transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
    },
    inputFieldFocus: {
      outline: 'none',
      borderColor: '#007bff',
      backgroundColor: '#fff',
      boxShadow: '0 0 8px rgba(0, 123, 255, 0.2)',
    },
    loginButton: {
      width: '100%',
      padding: '12px',
      fontSize: '1rem',
      fontWeight: 'bold',
      backgroundColor: '#555',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    },
    loginButtonHover: {
      backgroundColor: '#218838',
    },
    signupText: {
      textAlign: 'center',
      marginTop: '20px',
      color: '#555',
    },
    signupLink: {
      color: '#007bff',
      textDecoration: 'none',
    },
    signupLinkHover: {
      textDecoration: 'underline',
    },
    rightPanel: {
      flex: 0.63,
      backgroundImage: `url(${patternImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      borderRadius: '10px',
      minHeight: '90%',
    },
  };

  return (
    <div style={styles.page}>
      <div style={styles.leftPanel}>
        <h1 style={styles.logo}>JHC Clinic</h1>
        <p style={styles.welcomeText}>Create an account to manage your healthcare seamlessly.</p>

        <form onSubmit={handleSubmit}>
          <input
            style={styles.inputField}
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            style={styles.inputField}
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            style={styles.inputField}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button style={styles.loginButton} type="submit">
            Sign Up
          </button>
        </form>

        <p style={styles.signupText}>
          Already have an account?{' '}
          <a href="/login" style={styles.signupLink}>
            Login
          </a>
        </p>
      </div>

      <div style={styles.rightPanel}></div>
    </div>
  );
}

export default Register;
