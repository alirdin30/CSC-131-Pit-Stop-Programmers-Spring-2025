import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutUs from './pages/AboutUs';
import './App.css';
import Login from './pages/Login';
import CustomerAccount from './pages/CustomerAccount';
import EmployeeAccount from './pages/EmployeeAccount';
import AdminAccount from './pages/AdminAccount';
import EditServices from './pages/EditServices';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Services from './pages/Services';
import ScheduleAppointment from './pages/ScheduleAppointment';
import Confirmation from './pages/Confirmation';
import Employees from './pages/Employees';
import PendingAppointments from './pages/PendingAppointments';
import AssignedAppointments from './pages/AssignedAppointments';

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
      <Route path="/customer-car-status" element={<CustomerAccount />} /> {/*Once we make the car status page for the customer side, replace element here*/}
      <Route path="/customer-view-appointments" element={<CustomerAccount />} /> {/*Once we make the view appointments page for the customer side, replace element here*/}
      <Route path="/customer-service-history" element={<CustomerAccount />} /> {/*Once we make the service history page for the customer side, replace element here*/}
      <Route path="/customer-profile" element={<CustomerAccount />} /> {/*Once we make the profile page for the customer side, replace element here*/}
      <Route path="/employee-account" element={<EmployeeAccount />} />
      <Route path="/admin-account" element={<AdminAccount />} />
      <Route path="/edit-services" element={<EditServices />} />
      <Route path="/admin-service-history" element={<AdminAccount />} /> {/*Once we make the service history page for the admin side, replace element here*/}
      <Route path="/employee-log" element={<AdminAccount />} /> {/*Once we make the employee log page for the admin side, replace element here*/}
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/Confirmation" element={<Confirmation />} />
      <Route path="/employees" element={<Employees />} />
      <Route path="/pending-appointments" element={<PendingAppointments />} />
      <Route path="/assigned-appointments" element={<AssignedAppointments />} />
    </Routes> 
  );
}

export default App;
