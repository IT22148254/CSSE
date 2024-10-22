import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import patternImage from '../medical/log1.png'; // Ensure the path to the image is correct

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/login", { email, password })
      .then(result => {
        console.log(result.data);
        if (result.data.status === "Success") {
          // Save user email and username to localStorage
          localStorage.setItem('email', result.data.email);
          localStorage.setItem('username', result.data.username);
          navigate("/home");
        } else if (result.data.status === "AdminSuccess") {
          // Save admin email and username to localStorage
          localStorage.setItem('email', result.data.email);
          localStorage.setItem('username', result.data.username); // Admin username as "Admin"
          navigate("/admin-dashboard");
        } else {
          alert("Invalid credentials. Please try again.");
        }
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
    loginButton: {
      width: '100%',
      padding: '12px',
      fontSize: '1rem',
      fontWeight: 'bold',
      backgroundColor: '#28a745',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
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
        <p style={styles.welcomeText}>Login to your account</p>

        <form onSubmit={handleSubmit}>
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
          <button
            style={styles.loginButton}
            type="submit"
          >
            Login
          </button>
        </form>

        <p style={styles.signupText}>
          Don't have an account?{' '}
          <a href="/register" style={styles.signupLink}>
            Sign Up
          </a>
        </p>
      </div>

      <div style={styles.rightPanel}></div>
    </div>
  );
}

export default Login;
