import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from './Sidebar'; // Import the Sidebar component

function Profile() {
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    birthdate: '',
    address: '',
    allergies: '',
    medicalTips: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem('email');
    
    if (!email) {
      navigate('/login');
    } else {
      // Fetch profile data from backend
      axios.get("http://localhost:5000/profile", { params: { email } })
        .then(response => {
          setProfileData(response.data);
        })
        .catch(err => {
          console.error(err);
          navigate('/login'); // If error, redirect to login
        });
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.put("http://localhost:5000/profile", profileData)
      .then(() => {
        alert('Profile updated successfully');
      })
      .catch(err => {
        console.error(err);
        alert('Failed to update profile');
      });
  };

  const handleBackClick = () => {
    navigate('/home'); // Navigate back to Home screen
  };

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <Sidebar />

      {/* Profile content */}
      <div style={styles.profileContent}>
        <div style={styles.profilePanel}>
          <h1 style={styles.logo}>User Profile</h1>

          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.profileInfo}>
              <div style={styles.formGroup}>
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  value={profileData.name}
                  onChange={handleInputChange}
                  style={styles.input}
                />
              </div>

              <div style={styles.formGroup}>
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleInputChange}
                  style={styles.input}
                  disabled
                />
              </div>

              <div style={styles.formGroup}>
                <label>Birthdate:</label>
                <input
                  type="date"
                  name="birthdate"
                  value={profileData.birthdate}
                  onChange={handleInputChange}
                  style={styles.input}
                />
              </div>

              <div style={styles.formGroup}>
                <label>Address:</label>
                <input
                  type="text"
                  name="address"
                  value={profileData.address}
                  onChange={handleInputChange}
                  style={styles.input}
                />
              </div>

              <div style={styles.formGroup}>
                <label>Allergies:</label>
                <input
                  type="text"
                  name="allergies"
                  value={profileData.allergies}
                  onChange={handleInputChange}
                  style={styles.input}
                />
              </div>

              <div style={styles.formGroup}>
                <label>Medical Tips:</label>
                <textarea
                  name="medicalTips"
                  value={profileData.medicalTips}
                  onChange={handleInputChange}
                  style={styles.textarea}
                />
              </div>
            </div>

            <button style={styles.saveButton} type="submit">
              Save Profile
            </button>
          </form>

         
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    height: '100vh',
    backgroundColor: '#f0f2f5',
    flexDirection: 'row', // Flex direction set to row to allow a landscape layout
  },
  profileContent: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2rem',
    backgroundColor: '#f7f9fc',
  },
  profilePanel: {
    padding: '2rem',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    maxWidth: '800px', // Adjusted for wider screens
    width: '100%',
    textAlign: 'center',
  },
  logo: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: '30px',
  },
  form: {
    width: '100%',
  },
  profileInfo: {
    marginBottom: '30px',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr', // Split form fields into two columns for landscape layout
    gap: '20px',
  },
  formGroup: {
    textAlign: 'left',
  },
  input: {
    width: '100%',
    padding: '12px',
    fontSize: '1rem',
    borderRadius: '8px',
    border: '1px solid #ccc',
    marginTop: '5px',
  },
  textarea: {
    width: '100%',
    padding: '12px',
    fontSize: '1rem',
    borderRadius: '8px',
    border: '1px solid #ccc',
    marginTop: '5px',
    height: '120px',
  },
  saveButton: {
    width: '30%',
    padding: '15px',
    fontSize: '1rem',
    fontWeight: 'bold',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    marginTop: '20px',
  },
 
};

export default Profile;
