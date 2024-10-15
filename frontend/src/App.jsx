import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/pbs/HomePage';
import DoctorProfile from './pages/pbs/DoctorProfile';
import LoginPage from './pages/pbs/LoginPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path='/doctor/:id' element={<DoctorProfile/>}/>
        <Route path='/login' element={<LoginPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
