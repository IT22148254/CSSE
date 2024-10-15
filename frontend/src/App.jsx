import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/pbs/HomePage';
import DoctorProfile from './pages/pbs/DoctorProfile';
import LoginPage from './pages/pbs/LoginPage';
import AddDoctorPage from './pages/pbs/AddDoctorPage';
import ManageDoctorsPage from './pages/pbs/ManageDoctorsPage';
import EditDoctorPage from './pages/pbs/EditDoctorPage';
import AvailableTimesPage from './pages/pbs/AvailableTimesPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path='/doctor/:id' element={<DoctorProfile/>}/>
        <Route path='/login' element={<LoginPage/>} />
        <Route path='/add-doctor' element={<AddDoctorPage/>} />
        <Route path='/manage-doctors' element={<ManageDoctorsPage/>} />
        <Route path='/edit-doctor/:id' element={<EditDoctorPage/>} />
        <Route path='/available-times/:id' element={<AvailableTimesPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
