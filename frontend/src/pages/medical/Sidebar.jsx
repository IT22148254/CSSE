import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for API calls

function Sidebar() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    username: '',
    email: '',
  });

  useEffect(() => {
    const email = localStorage.getItem('email');
    console.log('Email fetched from localStorage:', email); // Check the email fetched
  
    if (email) {
      axios.get('http://localhost:3002/user-info', { params: { email } })
        .then(response => {
          console.log('User info response:', response.data); // Log the response from the backend
          setUserInfo({
            username: response.data.username,
            email: response.data.email,
          });
        })
        .catch(err => {
          console.error('Failed to fetch user info:', err);
        });
    }
  }, []);
  
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleProfileClick = () => {
    navigate('/profile'); // Navigate to Profile screen
  };

  const handleViewProfileClick = () => {
    navigate('/view-profile'); // Navigate to View Profile screen
  };

  return (
    <div style={styles.sidebar}>
      {/* Profile Section */}
      <div style={styles.profileSection}>
        <h2 style={styles.profileUsername}>{userInfo.username || 'Loading...'}</h2>
        <p style={styles.profileEmail}>{userInfo.email || 'Loading...'}</p>
        
        <button style={styles.profileButton} onClick={handleProfileClick}>
          Update Profile
        </button>

        <button style={styles.profileViewButton} onClick={handleViewProfileClick}>
          View Profile
        </button>
      </div>

      {/* Navigation Menu */}
      <ul style={styles.navList}>
        <li style={styles.navItem}>Dashboard</li>
        <li style={styles.navItem}>Patients</li>
        <li style={styles.navItem}>Appointments</li>
        <li style={styles.navItem}>Doctors</li>
        <li style={styles.navItem}>Messages</li>
        <li style={styles.navItem}>Settings</li>
      </ul>

      {/* Logout Button */}
      <button style={styles.logoutButton} onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

const styles = {
  sidebar: {
    flex: '0.15',
    backgroundColor: '#519ae8',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '20px',
    height: '100vh',
  },
  profileSection: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  profileUsername: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
  },
  profileEmail: {
    fontSize: '0.9rem',
    color: '#ccc',
    marginBottom: '10px',
  },
  profileButton: {
    background: 'none', // No background color
    color: 'inherit', // Inherit the sidebar text color
    padding: '0', // No padding
    border: 'none', // No border
    cursor: 'pointer', // Maintain cursor pointer
    fontSize: '0.9rem',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  profileViewButton: {
    background: 'none', // No background color
    color: 'inherit', // Inherit the sidebar text color
    padding: '0', // No padding
    border: 'none', // No border
    cursor: 'pointer', // Maintain cursor pointer
    fontSize: '0.9rem',
    fontWeight: 'bold',
    marginBottom: '20px', // Spacing below View Profile button
  },
  navList: {
    listStyleType: 'none',
    padding: 0,
  },
  navItem: {
    padding: '10px 0',
    cursor: 'pointer',
    textAlign: 'center',
    fontSize: '1rem',
  },
  logoutButton: {
    background: 'none', // No background color
    color: 'inherit', // Inherit the sidebar text color
    padding: '0', // No padding
    border: 'none', // No border
    cursor: 'pointer', // Maintain cursor pointer
    fontSize: '1rem',
    fontWeight: 'bold',
    marginTop: 'auto',
    textDecoration: 'underline', // Optional underline to indicate clickable text
  },
};

export default Sidebar;
