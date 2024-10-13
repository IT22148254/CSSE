import React, { useContext, useState } from "react";
import { AppointmentContext } from "../../context/appointment/AppointmentContext";

const AppointmentList = () => {
  const { appointments, loading, fetchAppointments } =
    useContext(AppointmentContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [completedCount, setCompletedCount] = useState(0);
  const [uncompletedCount, setUncompletedCount] = useState(0);

  useEffect(() => {
    const completed = appointments.filter(
      (appointment) => appointment.status === "completed"
    ).length;
    const uncompleted = appointments.filter(
      (appointment) => appointment.status === "not completed"
    ).length;
    setCompletedCount(completed);
    setUncompletedCount(uncompleted);
  }, [appointments]);

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

  const updateAppointmentStatus = async (id, status) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/appointments/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error: ${response.status} ${errorText}`);
      }

      fetchAppointments();
    } catch (error) {
      console.error("Failed to update appointment status:", error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  const filteredAppointments = appointments.filter((appointment) =>
    appointment.userName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
        Appointments List
      </h2>
      <div className="flex justify-between mb-4">
        <p className="text-green-600">Completed: {completedCount}</p>
        <p className="text-red-600">Not Completed: {uncompletedCount}</p>
      </div>
      <input
        type="text"
        placeholder="Search by name"
        className="mb-4 p-2 border border-blue-300 rounded w-full bg-blue-50"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-blue-100">
              <th className="border p-2 text-left">Name</th>
              <th className="border p-2 text-left">Contact</th>
              <th className="border p-2 text-left">Age</th>
              <th className="border p-2 text-left">Doctor</th>
              <th className="border p-2 text-left">Date</th>
              <th className="border p-2 text-left">Time</th>
              <th className="border p-2 text-left">Category</th>
              <th className="border p-2 text-left">Status</th>
              <th className="border p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.map((appointment) => (
              <tr key={appointment._id} className="hover:bg-gray-100">
                <td className="border p-2">{appointment.userName}</td>
                <td className="border p-2">{appointment.contactNumber}</td>
                <td className="border p-2">{appointment.age}</td>
                <td className="border p-2">{appointment.doctor}</td>
                <td className="border p-2">
                  {new Date(appointment.date).toLocaleDateString()}
                </td>
                <td className="border p-2">{appointment.time}</td>
                <td className="border p-2">{appointment.category}</td>
                <td className="border p-2">
                  <select
                    value={appointment.status}
                    onChange={(e) =>
                      updateAppointmentStatus(appointment._id, e.target.value)
                    }
                    className="border border-blue-300 rounded p-1"
                  >
                    <option value="not completed">Not Completed</option>
                    <option value="completed">Completed</option>
                  </select>
                </td>
                <td className="border p-2">
                  <button
                    onClick={() => deleteAppointment(appointment._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppointmentList;
