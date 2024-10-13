// AppointmentForm.jsx
import React, { useState } from "react";

const AppointmentForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    userName: "",
    contactNumber: "",
    age: "",
    doctor: "",
    date: "",
    time: "",
    category: "Consultation",
  });

  // Sample list of doctors, this can come from a database or API in a real-world app
  const doctorList = [
    "Dr. Smith",
    "Dr. Johnson",
    "Dr. Brown",
    "Dr. Taylor",
    "Dr. Anderson",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    // Reset form after submission
    setFormData({
      userName: "",
      contactNumber: "",
      age: "",
      doctor: "",
      date: "",
      time: "",
      category: "Consultation",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>User Name:</label>
        <input
          type="text"
          name="userName"
          value={formData.userName}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Contact Number:</label>
        <input
          type="text"
          name="contactNumber"
          value={formData.contactNumber}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Age:</label>
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Doctor:</label>
        <select
          name="doctor"
          value={formData.doctor}
          onChange={handleChange}
          required
        >
          <option value="" disabled>
            Select a doctor
          </option>
          {doctorList.map((doctor, index) => (
            <option key={index} value={doctor}>
              {doctor}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Date:</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Time:</label>
        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Category:</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="Consultation">Consultation</option>
          <option value="Follow-up">Follow-up</option>
          <option value="Routine Check-up">Routine Check-up</option>
          <option value="Emergency">Emergency</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <button type="submit">Schedule Appointment</button>
    </form>
  );
};

export default AppointmentForm;
