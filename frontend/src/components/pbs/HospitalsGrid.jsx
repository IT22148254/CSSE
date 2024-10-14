// components/HospitalsGrid.jsx
import React from 'react';
import HospitalCard from './HospitalCard';
import './HospitalsGrid.css'; // External CSS for grid styling

const HospitalsGrid = ({ hospitals }) => {
  return (
    <div className="hospitals-grid">
      {hospitals.map((hospital) => (
        <HospitalCard key={hospital._id} hospital={hospital} />
      ))}
    </div>
  );
};

export default HospitalsGrid;
