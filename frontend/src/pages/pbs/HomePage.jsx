import React, { useState, useEffect } from "react";
import DoctorsGrid from "../../components/pbs/DoctorsGrid";
import HospitalsGrid from "../../components/pbs/HospitalsGrid";
import Sidebar from "../../components/pbs/Sidebar"; // Import Sidebar component
import "./HomePage.css"; // External CSS for styling
import axios from "axios";
import { getHospitalData } from "../../util/authUtil"; // Import the utility function

const HomePage = () => {
  const [activeTab, setActiveTab] = useState("Doctors");
  const [doctors, setDoctors] = useState([]);
  const [hospitals, setHospitals] = useState([]); // Add hospitals state for the "Hospitals" tab
  const [searchQuery, setSearchQuery] = useState(""); // Capture search input
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/doctors/");
        setDoctors(response.data);
      } catch (error) {
        setError("Error fetching data");
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchHospitals = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/hospitals/"
        );
        setHospitals(response.data.data);
      } catch (error) {
        setError("Error fetching hospitals");
        console.error("Error fetching hospitals:", error);
      }
    };

    fetchDoctors();
    fetchHospitals();
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
    setSearchQuery(""); // Reset search when switching tabs
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // Update the search query as the user types
  };

  const hospitalData = getHospitalData(); // Get hospital data from local storage

  return (
    <div className="home-page">
      <Sidebar userEmail={hospitalData?.email || "Guest"} /> {/* Include Sidebar component */}
      <div className="home-container">
        <header className="header">
          <div className="search-bar">
            <input
              type="text"
              placeholder={`Search ${activeTab}...`}
              className="search-input"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <button className="search-button">Search</button>
          </div>
        </header>

        <div className="tabs-container">
          <button
            className={`tab-button ${activeTab === "Doctors" ? "active" : ""}`}
            onClick={() => handleTabClick("Doctors")}
          >
            Doctors
          </button>
          <button
            className={`tab-button ${activeTab === "Hospitals" ? "active" : ""}`}
            onClick={() => handleTabClick("Hospitals")}
          >
            Hospitals
          </button>
        </div>

        <div className="content-container">
          {activeTab === "Doctors" ? (
            <DoctorsGrid doctors={filteredDoctors} />
          ) : (
            <>
              {filteredHospitals.length > 0 ? (
                <HospitalsGrid hospitals={filteredHospitals} />
              ) : (
                <div>No hospitals found.</div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
