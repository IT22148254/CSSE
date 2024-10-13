import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AppointmentProvider } from "./context/appointment/AppointmentContext";
import AppointmentPage from "./pages/appointment/AppointmentPage";

function App() {
  return (
    <AppointmentProvider>
      <Router>
        <Routes>
          <Route path="/" element={<AppointmentPage />} />
        </Routes>
      </Router>
    </AppointmentProvider>
  );
}
export default App;
