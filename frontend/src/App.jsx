import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/pbs/HomePage';
import DoctorProfile from './pages/pbs/DoctorProfile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path='/doctor/:id' element={<DoctorProfile/>}/>
      </Routes>
    </Router>
  );
}

export default App;
