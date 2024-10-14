import React,{useState,useEffect} from 'react';
import DoctorCard from './DoctorCard';
import './DoctorsGrid.css';
import axios from 'axios';

const DoctorsGrid = ({doctors}) => {

  return (
    <div className="doctors-grid">
      {doctors.map(doctor => (
        <DoctorCard key={doctor._id} doctor={doctor} />
      ))}
    </div>
  );
};

export default DoctorsGrid;
