import React, { useState } from 'react';
import axios from 'axios';
import './LoginPage.css'; 
// import { getHospitalData } from '../../util/authUtil';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('hospital');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:5000/api/hospitals/login`, { email, password, role });
      if (role === 'hospital') {
          localStorage.setItem('hsp', JSON.stringify(response.data.data));
        //   const hospitalData = getHospitalData();
        //   console.log('Hospital login response:', hospitalData);
      }
      alert('Login successful');
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Login failed');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="role-buttons">
            <button
              type="button"
              className={`role-button ${role === 'hospital' ? 'active' : ''}`}
              onClick={() => setRole('hospital')}
            >
              Login as Hospital
            </button>
            <button
              type="button"
              className={`role-button ${role === 'patient' ? 'active' : ''}`}
              onClick={() => setRole('patient')}
            >
              Login as Patient
            </button>
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
