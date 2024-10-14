import React, { useContext, useState, useEffect } from "react";
import { AppointmentContext } from "../../context/appointment/AppointmentContext";
import jsPDF from "jspdf";
import "jspdf-autotable";

const AppointmentList = () => {
  const { appointments, loading, fetchAppointments } =
    useContext(AppointmentContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
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

  //function to generate report

  const generateReport = () => {
    const doc = new jsPDF();

    // Adding the title
    doc.text("Appointments Report", 14, 20);
    doc.setFontSize(12);
    doc.text(`Total Completed: ${completedCount}`, 14, 30);
    doc.text(`Total Not Completed: ${uncompletedCount}`, 14, 40);

    // Adding the table
    const tableColumn = [
      "Name",
      "Contact",
      "Age",
      "Doctor",
      "Date",
      "Time",
      "Category",
      "Status",
    ];
    const tableRows = [];

    appointments.forEach((appointment) => {
      const appointmentData = [
        appointment.userName,
        appointment.contactNumber,
        appointment.age,
        appointment.doctor,
        new Date(appointment.date).toLocaleDateString(),
        appointment.time,
        appointment.category,
        appointment.status,
      ];
      tableRows.push(appointmentData);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 50,
      theme: "grid",
    });

    // Saving the report
    doc.save("appointments_report.pdf");
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  const filteredAppointments = appointments.filter((appointment) => {
    const matchesSearchTerm = appointment.userName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesDate =
      !selectedDate ||
      new Date(appointment.date).toLocaleDateString() ===
        new Date(selectedDate).toLocaleDateString();
    return matchesSearchTerm && matchesDate;
  });

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
        Appointments List
      </h2>
      <div className="flex space-x-4 mb-4">
        <input
          type="text"
          placeholder="Search"
          className="mb-4 p-2 border border-blue-300 rounded w-full bg-blue-50"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <input
          type="date"
          className="mb-4 p-2 border border-blue-300 rounded bg-blue-50 cursor-pointer"
          value={selectedDate}
          placeholder="Filter by date"
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>
      <div className="flex gap-4 mb-4">
        <p className="text-green-600">Completed: {completedCount}</p>
        <p className="text-red-600">Not Completed: {uncompletedCount}</p>
      </div>
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
      <button
        onClick={generateReport}
        className="bg-blue-500 text-white mt-4 px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Generate Report
      </button>
    </div>
  );
};

export default AppointmentList;
