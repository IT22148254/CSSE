import React from 'react';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const navigate = useNavigate();

  const handleManageUsers = () => {
    navigate('/manage-users'); // Navigate to Manage Users screen
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login'); // Navigate to Login screen
  };

  const styles = {
    container: {
      display: 'flex', // Flex to position the sidebar and content side by side
      minHeight: '100vh', // Ensures the content takes full height of the viewport
      backgroundColor: '#f4f4f4',
    },
    sidebar: {
      width: '250px',
      backgroundColor: '#333',
      color: '#fff',
      padding: '1rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    sidebarHeader: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      marginBottom: '1.5rem',
      color: '#fff',
    },
    sidebarLink: {
      color: '#ffffff',
      textDecoration: 'none',
      color: '#ffffff',
      padding: '10px 0',
      fontSize: '1.1rem',
      cursor: 'pointer',
      width: '100%',
      textAlign: 'center',
      borderBottom: '1px solid #444',
    },
    logoutButton: {
      background: 'none', // No background color
      color: 'inherit', // Inherit the sidebar text color
      padding: '10px 0',
      border: 'none', // No border
      cursor: 'pointer', // Pointer on hover
      textAlign: 'center',
      fontSize: '1rem',
      textDecoration: 'underline', // Optional underline to make it look like a link
    },
    content: {
      flex: '0.8', // Content takes 80% of the screen width
      padding: '2rem',
    },
    header: {
      fontSize: '2rem',
      fontWeight: 'bold',
      marginBottom: '1rem',
      color: '#333',
    },
    welcomeText: {
      fontSize: '1.2rem',
      color: '#555',
      marginBottom: '2rem',
    },
    dashboardContent: {
      fontSize: '1rem',
      color: '#666',
    },
  };

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <div>
          <div style={styles.sidebarHeader}>Admin Panel</div>
          <div style={styles.sidebarLink} onClick={() => navigate('/admin-dashboard')}>
            Dashboard
          </div>
          <div style={styles.sidebarLink} onClick={() => navigate('/admin-dashboard')}>
            Home
          </div>
          <div style={styles.sidebarLink} onClick={handleManageUsers}>
            Manage Users
          </div>
          <div style={styles.sidebarLink} onClick={() => navigate('/settings')}>
            Settings
          </div>
        </div>

        {/* Logout Button */}
        <button style={styles.logoutButton} onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div style={styles.content}>
        <h1 style={styles.header}>Admin Dashboard</h1>
        <p style={styles.welcomeText}>Welcome, Admin. You have full access to manage the system.</p>
        <div style={styles.dashboardContent}>
          <p>Here you can manage users, view statistics, and configure settings.</p>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
