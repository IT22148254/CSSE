import React,{useState} from 'react';
import './Sidebar.css'; 
import { getHospitalData } from "../../util/authUtil";

const Sidebar = ({ userEmail }) => {
    const [isAdminOpen, setIsAdminOpen] = useState(false);
    const hospitalData = getHospitalData();

    const toggleAdminDropdown = () => {
        setIsAdminOpen(!isAdminOpen);
    };

    return (
        <div className="sidebar">
            <h2>JHC</h2>
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
                {hospitalData && (
                    <li>
                        <a href="#!" onClick={toggleAdminDropdown}>Admin</a>
                        {isAdminOpen && (
                            <ul className="dropdown">
                                <li><a href="/add-doctor">Add Doctor</a></li>
                                <li><a href="/manage-doctors">Manage Doctors</a></li>
                            </ul>
                        )}
                    </li>
                )}
                <li><a href="/settings">Settings</a></li>
                <li><a href="/logout">LogOut</a></li>
            </ul>
        </div>
    );
};

export default Sidebar;
