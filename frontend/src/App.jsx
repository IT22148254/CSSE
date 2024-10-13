import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AppointmentProvider } from "./context/appointment/AppointmentContext";
import AppointmentPage from "./pages/appointment/AppointmentPage";
import AppointmentList from "./pages/appointment/AppointmentList";

function App() {
  return (
    <AppointmentProvider>
      <Router>
        <Routes>
          <Route path="/" element={<AppointmentPage />} />
          <Route path="/appointments" element={<AppointmentList />} />
        </Routes>
      </Router>
    </AppointmentProvider>
  );
}
export default App;
