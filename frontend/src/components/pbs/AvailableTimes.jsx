import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AvailableTimes.css'; // External CSS for styling

const AvailableTimes = ({ doctorId }) => {
  const [availableTimes, setAvailableTimes] = useState([]);
  const [filteredTimes, setFilteredTimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchDay, setSearchDay] = useState('');
  const [filterAvailable, setFilterAvailable] = useState('');

  useEffect(() => {
    const fetchAvailableTimes = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/available-times/doctor/${doctorId}`);
        setAvailableTimes(response.data.availableTimes);
        setFilteredTimes(response.data.availableTimes);
      } catch (error) {
        setError('Error fetching available times');
        console.error('Error fetching available times:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAvailableTimes();
  }, [doctorId]);

  const getDayFromDate = (date) => {
    const [day] = date.split('/');
    return day;
  };

  useEffect(() => {
    let filtered = availableTimes;

    if (searchDay) {
      filtered = filtered.filter(entry => getDayFromDate(entry.date) === searchDay);
    }

    if (filterAvailable) {
      filtered = filtered.filter(entry => entry.available.toString() === filterAvailable);
    }

    setFilteredTimes(filtered);
  }, [searchDay, filterAvailable, availableTimes]);

  if (loading) {
    return <div>Loading available times...</div>; // Loading state
  }

  if (error) {
    return <div>{error}</div>; // Error message
  }

  return (
    <div className="available-times">
      <h2>Available Times</h2>
      <div className="filters">
        <input
          type="text"
          value={searchDay}
          onChange={(e) => setSearchDay(e.target.value)}
          placeholder="Search by day (dd)"
        />
        <select value={filterAvailable} onChange={(e) => setFilterAvailable(e.target.value)}>
          <option value="">All</option>
          <option value="true">Available</option>
          <option value="false">Unavailable</option>
        </select>
      </div>
      {filteredTimes.length === 0 ? (
        <p>No available times.</p>
      ) : (
        <table className="available-times-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Times</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredTimes.map((entry, index) => (
              <tr key={index}>
                <td>{entry.date}</td>
                <td>{entry.times.join(', ')}</td>
                <td>{entry.available ? 'Available' : 'Unavailable'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AvailableTimes;
