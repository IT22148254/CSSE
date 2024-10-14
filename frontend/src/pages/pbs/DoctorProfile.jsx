import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AvailableTimes from '../../components/pbs/AvailableTimes';
import './DoctorProfile.css'; // External CSS for styling
import { useParams,useNavigate } from 'react-router-dom';

const DoctorProfile = ({ doctorId }) => {
  const [doctor, setDoctor] = useState(null);
  const [showAvailableTimes, setShowAvailableTimes] = useState(false);

  doctorId  = useParams().id;

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/doctors/${doctorId}`);
        setDoctor(response.data);
      } catch (error) {
        console.error('Error fetching doctor details:', error);
      }
    };

    fetchDoctor();
  }, [doctorId]);

  if (!doctor) {
    return <div>Loading...</div>; // Loading state while fetching data
  }

  const handleAvailableTimesClick = () => {
    setShowAvailableTimes(!showAvailableTimes);
  };

  return (
    <div className="doctor-profile">
      <div className="profile-header">
        <img src={doctor.profilePic || '/default-profile.png'} alt={`${doctor.firstName} ${doctor.lastName}`} className="profile-pic" />
        <h1>{doctor.firstName} {doctor.lastName}</h1>
        <p>{doctor.titles.join(', ')}</p>
        <p><strong>Specialisation:</strong> {doctor.specialisation}</p>
        <p><strong>Email:</strong> {doctor.email}</p>
      </div>

      <button className="available-times-button" onClick={handleAvailableTimesClick}>
        {showAvailableTimes ? 'Hide Available Times' : 'View Available Times'}
      </button>

      {showAvailableTimes && <AvailableTimes doctorId={doctorId} />} {/* Conditionally render available times */}
    </div>
  );
};

export default DoctorProfile;
