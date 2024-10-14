import React, { useContext, useState } from "react";
import { AppointmentContext } from "../../context/appointment/AppointmentContext";
import AppointmentForm from "./AppointmentForm";

const AppointmentTiles = () => {
  const { appointments, fetchAppointments } = useContext(AppointmentContext);
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const deleteAppointment = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/appointments/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error: ${response.status} ${errorText}`);
      }

      fetchAppointments();
    } catch (error) {
      console.error("Failed to delete appointment:", error);
    }
  };

  const handleEditClick = (appointment) => {
    setEditingAppointment(appointment);
    setShowForm(true);
  };

  const handleCancelClick = () => {
    setShowForm(false);
    setEditingAppointment(null);
  };

  const handleUpdate = () => {
    fetchAppointments();
    setShowForm(false);
  };

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
        Your Appointments
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {appointments.map((appointment) => (
          <div
            key={appointment._id}
            className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-xl font-semibold text-gray-800">
                {appointment.userName}
              </h3>
              <p className="text-gray-600">{appointment.contactNumber}</p>
              <p className="text-gray-600">Age: {appointment.age}</p>
              <p className="text-gray-600">Doctor: {appointment.doctor}</p>
              <p className="text-gray-600">
                Date: {new Date(appointment.date).toLocaleDateString()}
              </p>
              <p className="text-gray-600">Time: {appointment.time}</p>
              <p className="text-gray-600">Category: {appointment.category}</p>
              <p className="text-gray-600">Status: {appointment.status}</p>
            </div>
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => handleEditClick(appointment)}
                className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
              >
                Update
              </button>
              <button
                onClick={() => deleteAppointment(appointment._id)}
                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {showForm && editingAppointment && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <AppointmentForm
              appointment={editingAppointment}
              onSuccess={handleUpdate}
            />
            <div className="mt-4 flex justify-end gap-4">
              <button
                onClick={handleUpdate}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Update
              </button>
              <button
                onClick={handleCancelClick}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentTiles;
