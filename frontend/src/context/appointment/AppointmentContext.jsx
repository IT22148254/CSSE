import React, { createContext, useState, useEffect } from "react";

export const AppointmentContext = createContext();

export const AppointmentProvider = ({ children }) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/appointments/");

      if (!response.ok) {
        // Handle non-2xx HTTP responses
        const errorText = await response.text();
        throw new Error(`Error: ${response.status} ${errorText}`);
      }

      const data = await response.json();
      setAppointments(data);
    } catch (error) {
      console.error("Failed to fetch appointments:", error);
    } finally {
      setLoading(false);
    }
  };

  const createAppointment = async (appointment) => {
    try {
      const response = await fetch("http://localhost:5000/api/appointments/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(appointment),
      });

      if (!response.ok) {
        // Handle non-2xx HTTP responses
        const errorText = await response.text();
        throw new Error(`Error: ${response.status} ${errorText}`);
      }

      const newAppointment = await response.json();
      setAppointments((prevAppointments) => [
        ...prevAppointments,
        newAppointment,
      ]);
    } catch (error) {
      console.error("Failed to create appointment:", error);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <AppointmentContext.Provider
      value={{
        appointments,
        loading,
        createAppointment,
        fetchAppointments,
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
};
