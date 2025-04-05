import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Diet from './pages/Diet';
import SleepPage from './pages/SleepPage'
import Meditation from './pages/MedicationPage';
export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/diet" element={<Diet />} />
        <Route path="/sleep" element={<SleepPage />} />
        <Route path="/medication" element={<Meditation />} />
      </Routes>
      <Footer />
    </>
  );
}
