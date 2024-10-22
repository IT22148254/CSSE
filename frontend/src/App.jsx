import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, BrowserRouter } from 'react-router-dom';
import HomePage from './pages/medical/HomePage';
import Login from './pages/medical/Login';
import Register from './pages/medical/Register';
import AdminDashboard from './pages/medical/AdminDashboard';
import Profile from './pages/medical/Profile';
import ViewProfile from './pages/medical/ViewProfile';
import ManageUsers from './pages/medical/ManageUsers';

function App() {
  const [state, setState] = useState(""); // Example use of useState

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/profile" element={<Profile />} /> 
        <Route path="/view-profile" element={<ViewProfile />} /> 
        <Route path="/manage-users" element={<ManageUsers />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
