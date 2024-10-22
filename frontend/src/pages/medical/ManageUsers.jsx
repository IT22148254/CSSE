import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import axios for API requests

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/userss');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);
  // Function to handle user deletion
  const deleteUser = async (userId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/users/${userId}`); // API call to delete user
      // Update UI by removing the deleted user from the state
      setUsers(users.filter(user => user._id !== userId));
      alert('User deleted successfully');
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Failed to delete user');
    }
  };

  const styles = {
    layout: {
      display: 'flex',
      minHeight: '100vh',
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
    container: {
      flex: 1,
      padding: '2rem',
    },
    header: {
      fontSize: '2rem',
      fontWeight: 'bold',
      marginBottom: '1.5rem',
      color: '#333',
      textAlign: 'center',
    },
    userTable: {
      width: '100%',
      borderCollapse: 'collapse',
      backgroundColor: '#fff',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    },
    tableHeader: {
      backgroundColor: '#007bff',
      color: '#fff',
      padding: '10px',
      textAlign: 'left',
    },
    tableCell: {
      padding: '10px',
      borderBottom: '1px solid #ddd',
      color: '#333',
    },
    loading: {
      textAlign: 'center',
      fontSize: '1.5rem',
      color: '#555',
      padding: '2rem',
    },
  };

  if (loading) {
    return <div style={styles.loading}>Loading users...</div>;
  }

  return (
    <div style={styles.layout}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <div style={styles.sidebarHeader}>Admin Panel</div>
        <div style={styles.sidebarLink}>
          <a href="/admin-dashboard" style={{ color: '#ffffff', textDecoration: 'none' }}>Dashboard</a>
        </div>
        <div style={styles.sidebarLink}>
          <a href="/admin-dashboard" style={{ color: '#ffffff', textDecoration: 'none' }}>Home</a>
        </div>
        <div style={styles.sidebarLink}>
          <a href="/manage-users" style={{ color: '#ffffff', textDecoration: 'none' }}>Manage Users</a>
        </div>
        <div style={styles.sidebarLink}>Settings</div>
        <div style={styles.sidebarLink}>Logout</div>

      </div>

      {/* Main Content */}
      <div style={styles.container}>
        <h1 style={styles.header}>Manage Users</h1>
        <table style={styles.userTable}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>Name</th>
              <th style={styles.tableHeader}>Email</th>
              <th style={styles.tableHeader}>Birth Date</th>
              <th style={styles.tableHeader}>Address</th>
              <th style={styles.tableHeader}>Allergies</th>
              <th style={styles.tableHeader}>Medical Tips</th>
              <th style={styles.tableHeader}>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td style={styles.tableCell}>{user.name}</td>
                <td style={styles.tableCell}>{user.email}</td>
                <td style={styles.tableCell}>{user.birthdate}</td>
                <td style={styles.tableCell}>{user.address}</td>
                <td style={styles.tableCell}>{user.allergies}</td>
                <td style={styles.tableCell}>{user.medicalTips}</td>
                <td style={styles.tableCell}>
                  <button
                    style={{ padding: '5px 10px', backgroundColor: '#912424', color: '#fff', border: 'none', cursor: 'pointer' }}
                    onClick={() => deleteUser(user._id)} // Call delete function
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManageUsers;
