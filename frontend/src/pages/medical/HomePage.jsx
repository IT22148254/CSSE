import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../medical/Sidebar'; // Import the Sidebar component

function Home() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the user's email and username from localStorage
    const storedUsername = localStorage.getItem('username');
    const storedEmail = localStorage.getItem('email');
    
    if (storedEmail && storedUsername) {
      setUsername(storedUsername);
      setEmail(storedEmail);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div style={styles.container}>
      {/* Include Sidebar Component */}
      <Sidebar />

      <div style={styles.mainContent}>
        <h2>Welcome, {username}</h2>
        <p>Your email is {email}</p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    height: '100vh',
    backgroundColor: '#f4f4f4',
  },
  mainContent: {
    flex: '0.8',
    padding: '2rem',
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    margin: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
};

export default Home;
