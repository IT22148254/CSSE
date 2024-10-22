import React from "react";
import "../css/Sidebar.css"; // Import your CSS file

const Sidebar = ({ userEmail }) => {
  return (
    <div className="sidebar">
      <h2>JHC Hospital</h2>
      {/* Display user email */}
      <div className="user-info">
        <p>{userEmail}</p>
      </div>
      <ul>
        <li>
          <a href="/home">Home</a>
        </li>
        <li>
          <a href="/profile">Profile</a>
        </li>
        <li>
          <a href="/appointmenthome">Submit appointment</a>
        </li>
        <li>
          <a href="/appointmentsTile">View Appointments</a>
        </li>
        <li>
          <a href="/profile">View Account New</a>
        </li>
        <li>
          <a href="/emergency">Emergency</a>
        </li>
        <li>
          <a href="/settings">Settings</a>
        </li>
        <li>
          <a href="/logout">LogOut</a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
