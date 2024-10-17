// src/components/AppointmentForm.js
import React, { useEffect, useState } from "react";
import { useAppointmentForm } from "../../hooks/appointment/useAppointmentForm";
import { useNavigate } from "react-router-dom";

const AppointmentForm = ({ appointment, onSuccess }) => {
  const { createAppointment } = useAppointmentForm();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userName: "",
    contactNumber: "",
    age: "",
    doctor: "",
    date: "",
    time: "",
    category: "Consultation",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false); // State for submission success
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    if (appointment) {
      // Populate the form data with the existing appointment data when editing
      setFormData({
        userName: appointment.userName,
        contactNumber: appointment.contactNumber,
        age: appointment.age,
        doctor: appointment.doctor,
        date: appointment.date.split("T")[0], // Format date correctly
        time: appointment.time,
        category: appointment.category,
      });
    }
  }, [appointment]);

  const validateUserName = (name) => {
    const regex = /^[a-zA-Z\s!@#$%^&*()_+=[\]{};':"\\|,.<>/?-]*$/;
    return regex.test(name);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "userName") {
      if (!validateUserName(value)) {
        setErrors({
          ...errors,
          userName: "User name can only contain letters",
        });
      } else {
        const { userName, ...rest } = errors;
        setErrors(rest);
      }
    }
  };

  const handleKeyPress = (e) => {
    const charCode = e.charCode;
    if (charCode < 48 || charCode > 57) {
      e.preventDefault();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createAppointment(formData);
    setIsSubmitted(true); // Show success pop-up
    setShowSuccessMessage(true);
    setFormData({
      userName: "",
      contactNumber: "",
      age: "",
      doctor: "",
      date: "",
      time: "",
      category: "Consultation",
    });

    // Hide the success message after 3 seconds
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);

    if (onSuccess) {
      onSuccess(); // Call the onSuccess prop if provided
    }
  };

  //redirected to the payment page
  const handleProceedToPayment = () => {
    navigate("/payment"); // Redirect to PaymentPage
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6 mt-8 form-container">
      <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
        Schedule your Appointment!
      </h2>
      {showSuccessMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
          <span className="block sm:inline">
            Appointment submitted successfully!
          </span>
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Enter Your Name:</label>
          <input
            type="text"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:bg-blue-50 transition-colors duration-300"
          />
          {errors.userName && (
            <span className="text-red-500">{errors.userName}</span>
          )}
        </div>
        <div>
          <label className="block text-gray-700">Contact Number:</label>
          <input
            type="text"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            required
            maxLength={10}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:bg-blue-50 transition-colors duration-300"
          />
        </div>
        <div>
          <label className="block text-gray-700">Age:</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
            min={1}
            max={150}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:bg-blue-50 transition-colors duration-300"
          />
        </div>
        <div>
          <label className="block text-gray-700">Select Doctor:</label>
          <select
            name="doctor"
            value={formData.doctor}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select a doctor</option>
            <option value="Dr. Smith">Dr. Smith</option>
            <option value="Dr. Johnson">Dr. Johnson</option>
            <option value="Dr. Williams">Dr. Williams</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700">Date:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block text-gray-700">Time:</label>
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block text-gray-700">Category:</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="Consultation">Consultation</option>
            <option value="Follow-up">Follow-up</option>
            <option value="Routine Check-up">Routine Check-up</option>
            <option value="Emergency">Emergency</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white rounded-md py-2 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Submit
        </button>
      </form>
      {isSubmitted && (
        <button
          onClick={handleProceedToPayment}
          className="w-full mt-4 bg-green-600 text-white rounded-md py-2 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          Proceed to Payment
        </button>
      )}
    </div>
  );
};

export default AppointmentForm;
