import React from 'react';
import PropTypes, { object } from 'prop-types';
import './DoctorCard.css';
import { useNavigate } from 'react-router-dom';

const DoctorCard = ({ doctor }) => {

  const navigate = useNavigate();

  return (
    <div className="doctor-card" onClick={(e)=>navigate(`/doctor/${doctor._id}`)}>
      <img src={doctor.profilePic} alt={`${doctor.firstName} ${doctor.lastName}`} className="doctor-card__image" />
      <div className="doctor-card__info" >
        <h2 className="doctor-card__name">{doctor.firstName} {doctor.lastName}</h2>
        <p className="doctor-card__specialisation">{doctor.specialisation}</p>
        <p className="doctor-card__email">{doctor.email}</p>
        <p className="doctor-card__titles">{doctor.titles.join(', ')}</p>
        <p className="doctor-card__hospital">Hospital : {doctor.hospital.name}</p>
      </div>
    </div>
  );
};

DoctorCard.propTypes = {
  doctor: PropTypes.shape({
    profilePic: PropTypes.string,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    specialisation: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    titles: PropTypes.arrayOf(PropTypes.string).isRequired,
    hospital: PropTypes.object.isRequired,
  }).isRequired,
};

export default DoctorCard;
