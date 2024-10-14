import React from 'react';
import './HospitalCard.css'; 
import { useNavigate } from 'react-router-dom';

const HospitalCard = ({ hospital }) => {
    const navigate = useNavigate();
  return (
    <div className="hospital-card">
      <img 
        src={hospital.pic || 'https://via.placeholder.com/150'} 
        alt={hospital.name} 
        className="hospital-img"
      />
      <div className="hospital-info" onClick={(e)=>navigate(`/hospital/${hospital._id}`)}>
        <h3 className="hospital-name">{hospital.name}</h3>
        <p className="hospital-city"><strong>City:</strong> {hospital.city}</p>
        <p className="hospital-address"><strong>Address:</strong> {hospital.address}</p>
        <p className="hospital-hotline"><strong>Hotline:</strong> {hospital.hotline}</p>
        <p className="hospital-email"><strong>Email:</strong> {hospital.email}</p>
      </div>
    </div>
  );
};

export default HospitalCard;
