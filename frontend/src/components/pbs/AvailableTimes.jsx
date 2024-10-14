import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AvailableTimes.css'; // External CSS for styling

const AvailableTimes = ({ doctorId }) => {
  const [availableTimes, setAvailableTimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAvailableTimes = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/available-times/doctor/${doctorId}`);
        setAvailableTimes(response.data.availableTimes);
      } catch (error) {
        setError('Error fetching available times');
        console.error('Error fetching available times:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAvailableTimes();
  }, [doctorId]);

  if (loading) {
    return <div>Loading available times...</div>; // Loading state
  }

  if (error) {
    return <div>{error}</div>; // Error message
  }

  return (
    <div className="available-times">
      <h2>Available Times</h2>
      {availableTimes.length === 0 ? (
        <p>No available times.</p>
      ) : (
        availableTimes.map((entry, index) => (
          <div key={index} className="available-time-entry">
            <p><strong>Date:</strong> {entry.date}</p>
            <p><strong>Times:</strong> {entry.times.join(', ')}</p>
            <p><strong>Status:</strong> {entry.available ? 'Available' : 'Unavailable'}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default AvailableTimes;
