import React from 'react';
import './Sidebar.css'; 

const Sidebar = ({ userEmail }) => {
    return (
        <div className="sidebar">
            <h2>JHC</h2>
            {/* Display user email */}
            <div className="user-info">
                <p>{userEmail}</p>
            </div>
            <ul>
                <li><a href="/home">Home</a></li>
                <li><a href="/profile">Profile</a></li>
                <li><a href="/add-patient">Add Patient</a></li>
                <li><a href="/view-patient">View Account</a></li>
                <li><a href="/profile">View Account New</a></li>
                <li><a href="/emergency">Emergency</a></li>
                <li><a href="/settings">Settings</a></li>
                <li><a href="/logout">LogOut</a></li>
            </ul>
        </div>
    );
};

export default Sidebar;
