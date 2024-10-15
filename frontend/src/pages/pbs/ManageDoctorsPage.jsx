import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ManageDoctorsPage.css";
import { useNavigate } from "react-router-dom";
import { getHospitalData } from "../../util/authUtil";

const ManageDoctorsPage = ({ onEdit, onDelete }) => {
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();
  const hospitalData = getHospitalData();

  useEffect(() => {
    if (hospitalData && hospitalData.name) {
      fetchDoctors();
    }
  }, [hospitalData]);

  const fetchDoctors = () => {
    if (hospitalData && hospitalData.name) {
      axios
        .get("http://localhost:5000/api/doctors")
        .then((response) => {
          const filteredDoctors = response.data.filter(
            (doctor) => doctor.hospital.name === hospitalData.name
          );
          setDoctors(filteredDoctors);
        })
        .catch((error) => {
          console.error("Error fetching doctors:", error);
        });
    }
  };

  const handleEdit = (doctor) => {
    navigate(`/edit-doctor/${doctor._id}`);
  };

  const handleDelete = async (doctorId) => {
    await axios
      .delete(`http://localhost:5000/api/doctors/${doctorId}`)
      .then((response) => {
        setDoctors(doctors.filter((doctor) => doctor._id !== doctorId));
      })
      .catch((error) => {
        console.error("Error deleting doctor:", error);
      });
    alert("Doctor deleted successfully");
    fetchDoctors();
  };

  return (
    <div className="manage-doctors-page">
      <h2>Manage Doctors</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Profile Picture</th>
            <th>First Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doctor) => (
            <tr key={doctor._id}>
              <td>
                <img
                  src={doctor.profilePic}
                  alt="Profile"
                  className="profile-pic"
                />
              </td>
              <td>{doctor.firstName}</td>
              <td>{doctor.email}</td>
              <td>
                <button onClick={() => handleEdit(doctor)}>Edit</button>
                <button onClick={() => handleDelete(doctor._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageDoctorsPage;
