import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from './Sidebar'; // Import Sidebar component

function ViewProfile() {
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    birthdate: '',
    address: '',
    allergies: '',
    medicalTips: '',
  });
  const [qrCode, setQrCode] = useState(''); // State for QR code
  const [loading, setLoading] = useState(true); // Loading state
  const [showModal, setShowModal] = useState(false); // State to manage modal visibility

  useEffect(() => {
    const email = localStorage.getItem('email'); // Get email from localStorage

    if (email) {
      // Fetch profile data
      axios.get("http://localhost:5000/profilee", { params: { email } })
        .then(response => {
          setProfileData(response.data); // Set profile data
          setLoading(false); // Stop loading
        })
        .catch(err => {
          console.error('Failed to fetch profile:', err);
          setLoading(false); // Stop loading on error
        });
    } else {
      console.error('Email not found in localStorage');
      setLoading(false);
    }
  }, []);

  const generateQrCode = () => {
    const email = localStorage.getItem('email');
    if (!email) {
      console.error('Email is missing from localStorage.');
      return;
    }

    console.log('Sending email for QR code generation:', email);  // Add this to check if email is correct

    // Fetch QR code from backend
    axios.get("http://localhost:5000/generate-qr", { params: { email } })
      .then(response => {
        setQrCode(response.data.qrCode); // Set QR code data (base64 URL)
        setShowModal(true); // Show modal when QR code is received
      })
      .catch(err => {
        console.error('Failed to generate QR code:', err.response ? err.response.data : err.message);
      });
  };

  const closeModal = () => {
    setShowModal(false); // Hide modal
  };

  return (
    <div style={styles.container}>
      <Sidebar /> {/* Sidebar */}

      <div style={styles.profileContent}>
        <div style={styles.profileCard}>
          <h1 style={styles.title}>Profile Information</h1>

          <div style={styles.profileDetailsContainer}>
            {/* Profile Information */}
            <div style={styles.profileInfo}>
              <div style={styles.infoGroup}>
                <strong>Name:</strong> <span>{profileData.name || 'Not provided'}</span>
              </div>
              <div style={styles.infoGroup}>
                <strong>Email:</strong> <span>{profileData.email || 'Not provided'}</span>
              </div>
              <div style={styles.infoGroup}>
                <strong>Birthdate:</strong> <span>{profileData.birthdate || 'Not provided'}</span>
              </div>
              <div style={styles.infoGroup}>
                <strong>Address:</strong> <span>{profileData.address || 'Not provided'}</span>
              </div>
              <div style={styles.infoGroup}>
                <strong>Allergies:</strong> <span>{profileData.allergies || 'Not provided'}</span>
              </div>
              <div style={styles.infoGroup}>
                <strong>Medical Tips:</strong> <span>{profileData.medicalTips || 'Not provided'}</span>
              </div>

              {/* Button to generate QR code */}
              <button style={styles.qrButton} onClick={generateQrCode}>Generate QR Code</button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for QR Code */}
      {showModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h2>My QR Code</h2>
            <img src={qrCode} alt="QR Code" style={styles.qrImageModal} />
            <br></br> <button onClick={closeModal} style={styles.closeButton}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    height: '100vh',
    backgroundColor: '#f8f9fc',
    overflow: 'auto' // Enable scrolling for the container
  },
  profileContent: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2rem',
    backgroundColor: '#f0f2f5',
    minHeight: '100%', // Ensure content takes at least full height
    overflowY: 'auto' // Enable vertical scrolling inside profile content
  },
  profileCard: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    padding: '3rem',
    width: '100%',
    maxWidth: '900px' // Adjusted width for space
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: '20px',
    textAlign: 'center',
    letterSpacing: '1px'
  },
  profileDetailsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
  },
  profileInfo: {
    fontSize: '1.2rem',
    lineHeight: '2',
    marginTop: '20px',
    flex: '1' // Make the profile info take the remaining space
  },
  infoGroup: {
    marginBottom: '15px',
    padding: '12px 0',
    borderBottom: '1px solid #e0e0e0'
  },
  qrButton: {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '10px 20px',
    fontSize: '1rem',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    marginTop: '20px',
    width: '100%'
  },
  qrContainer: {
    marginLeft: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: '0', // Prevent QR container from shrinking
  },
  qrImage: {
    width: '256px',
    height: '256px'
  },
  // Modal styles
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '8px',
    width: '400px',
    textAlign: 'center',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  },
  qrImageModal: {
    width: '200px',
    height: '200px',
    marginBottom: '20px'
  },
  closeButton: {
    padding: '8px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
  }
};

export default ViewProfile;
