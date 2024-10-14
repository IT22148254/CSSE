import React, { useState, useEffect } from 'react';
import DoctorsGrid from '../../components/pbs/DoctorsGrid'; // Assuming this is where the grid of doctors is coming from
import './HomePage.css'; // External CSS for styling
import axios from 'axios';

const HomePage = () => {
  const [activeTab, setActiveTab] = useState('Doctors');
  const [doctors, setDoctors] = useState([]);
  const [hospitals, setHospitals] = useState([]); // Add hospitals state for the "Hospitals" tab
  const [searchQuery, setSearchQuery] = useState(''); // Capture search input
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/doctors/');
        setDoctors(response.data);
      } catch (error) {
        setError('Error fetching data');
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    // const fetchHospitals = async () => {
    //   try {
    //     const response = await axios.get('http://localhost:5000/api/hospitals/');
    //     setHospitals(response.data);
    //   } catch (error) {
    //     setError('Error fetching hospitals');
    //     console.error('Error fetching hospitals:', error);
    //   }
    // };

    fetchDoctors();
    //fetchHospitals();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Handle search logic
  const filteredDoctors = doctors.filter((doctor) =>
    doctor.firstName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredHospitals = hospitals.filter((hospital) =>
    hospital.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setSearchQuery(''); // Reset search when switching tabs
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // Update the search query as the user types
  };

  return (
    <div className="home-container">
      <header className="header">
        <h1>Welcome.</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder={`Search ${activeTab}...`} // Dynamic placeholder based on active tab
            className="search-input"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button className="search-button">Search</button>
        </div>
      </header>

      <div className="tabs-container">
        <button
          className={`tab-button ${activeTab === 'Doctors' ? 'active' : ''}`}
          onClick={() => handleTabClick('Doctors')}
        >
          Doctors
        </button>
        <button
          className={`tab-button ${activeTab === 'Hospitals' ? 'active' : ''}`}
          onClick={() => handleTabClick('Hospitals')}
        >
          Hospitals
        </button>
      </div>

      <div className="content-container">
        {activeTab === 'Doctors' ? (
          <DoctorsGrid doctors={filteredDoctors} /> // Pass filtered doctors to the DoctorsGrid
        ) : (
          <div>
            {filteredHospitals.length > 0 ? (
              <ul>
                {filteredHospitals.map((hospital) => (
                  <li key={hospital._id}>{hospital.name}</li>
                ))}
              </ul>
            ) : (
              <div>No hospitals found.</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
