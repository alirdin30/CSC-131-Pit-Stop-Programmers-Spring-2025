import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutUs from './pages/AboutUs';
import './App.css';
import Login from './pages/Login';
import CustomerAccount from './pages/CustomerAccount';
import EmployeeAccount from './pages/EmployeeAccount';
import AdminAccount from './pages/AdminAccount';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Services from './pages/Services';
import ScheduleAppointment from './pages/ScheduleAppointment';
import Confirmation from './pages/Confirmation';
import Employees from './pages/Employees';
import PendingAppointments from './pages/PendingAppointments';
import AssignedAppointments from './pages/AssignedAppointments';
import Revenue from './pages/Revenue';
import CustomerHistory from './pages/CustomerHistory';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/login" element={<Login />} /> 
      <Route path="/services" element={<Services />} />
      <Route path="/schedule-appointment" element={<ScheduleAppointment />} />
      <Route path="/register" element={<Register />} /> 
      <Route path="/customer-account" element={<CustomerAccount />} />
      <Route path="/employee-account" element={<EmployeeAccount />} />
      <Route path="/admin-account" element={<AdminAccount />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/Confirmation" element={<Confirmation />} />
      <Route path="/employees" element={<Employees />} />
      <Route path="/pending-appointments" element={<PendingAppointments />} />
      <Route path="/assigned-appointments" element={<AssignedAppointments />} />
      <Route path="/revenue" element={<Revenue />} />
    </Routes> 
  );
}

export default App;
