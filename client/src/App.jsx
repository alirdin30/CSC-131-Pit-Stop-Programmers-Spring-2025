import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutUs from './pages/AboutUs';
import Services from './pages/Services';
import ScheduleAppointment from './pages/ScheduleAppointment';
import Confirmation from './pages/Confirmation';
import './App.css';
import Register from './pages/Register';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import EditProfile from './pages/EditProfile';

//Customer side imports
import CustomerAccount from './pages/CustomerAccount';
import CustomerHistory from './pages/CustomerHistory';
import CustomerViewAppointments from './pages/CustomerViewAppointments';
import Status from './pages/Status'

//Employee side imports
import EmployeeAccount from './pages/EmployeeAccount';
import PendingAppointments from './pages/PendingAppointments';
import AssignedAppointments from './pages/AssignedAppointments';
import EmployeeServiceHistory from './pages/EmployeeServiceHistory';

//Admin side imports
import AdminAccount from './pages/AdminAccount';
import EditServices from './pages/EditServices';
import ApproveHours from './pages/ApproveHours';
import Employees from './pages/Employees';
import Statistics from './pages/Statistics';
import AdminServiceHistory from './pages/AdminServiceHistory';

function App() {
  return (
    <Routes>
      {/*Home, login/register, and other universal pages*/}
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/services" element={<Services />} />
      <Route path="/schedule-appointment" element={<ScheduleAppointment />} />
      <Route path="/confirmation" element={<Confirmation />} />
      <Route path="/register" element={<Register />} /> 
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/edit-profile" element={<EditProfile />} />
      
      {/*Customer side pages*/}
      <Route path="/customer-account" element={<CustomerAccount />} />
      <Route path="/customer-car-status" element={<Status />} /> {/*Once we make the car status page for the customer side, replace element here*/}
      <Route path="/customer-view-appointments" element={<CustomerViewAppointments />} />
      <Route path="/customer-history" element={<CustomerHistory />} />
      
      {/*Employee side pages*/}
      <Route path="/employee-account" element={<EmployeeAccount />} />
      <Route path="/pending-appointments" element={<PendingAppointments />} />
      <Route path="/assigned-appointments" element={<AssignedAppointments />} />
      <Route path="/employee-service-history" element={<EmployeeServiceHistory/>}/>

      {/*Admin side pages*/}
      <Route path="/admin-account" element={<AdminAccount />} />
      <Route path="/edit-services" element={<EditServices />} />
      <Route path="/admin-service-history" element={<AdminServiceHistory />} />
      <Route path="/ApproveHours" element={<ApproveHours />} />
      <Route path="/manage-employees" element={<Employees />} />
      <Route path="/statistics" element={<Statistics />} />
    </Routes> 
  );
}

export default App;
