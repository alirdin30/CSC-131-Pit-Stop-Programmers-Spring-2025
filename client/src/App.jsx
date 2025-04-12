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

//Customer side imports
import CustomerAccount from './pages/CustomerAccount';

//Employee side imports
import EmployeeAccount from './pages/EmployeeAccount';
import PendingAppointments from './pages/PendingAppointments';
import AssignedAppointments from './pages/AssignedAppointments';

//Admin side imports
import AdminAccount from './pages/AdminAccount';
import EditServices from './pages/EditServices';
import Employees from './pages/Employees';
import EmployeeServiceHistory from './pages/EmployeeServiceHistory';

function App() {
  return (
    <Routes>
      {/*Home and login/register pages*/}
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/services" element={<Services />} />
      <Route path="/schedule-appointment" element={<ScheduleAppointment />} />
      <Route path="/confirmation" element={<Confirmation />} />
      <Route path="/register" element={<Register />} /> 
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      
      {/*Customer side pages*/}
      <Route path="/customer-account" element={<CustomerAccount />} />
      <Route path="/customer-car-status" element={<CustomerAccount />} /> {/*Once we make the car status page for the customer side, replace element here*/}
      <Route path="/customer-view-appointments" element={<CustomerAccount />} /> {/*Once we make the view appointments page for the customer side, replace element here*/}
      <Route path="/customer-service-history" element={<CustomerAccount />} /> {/*Once we make the service history page for the customer side, replace element here*/}
      <Route path="/customer-profile" element={<CustomerAccount />} /> {/*Once we make the profile page for the customer side, replace element here*/}
      
      {/*Employee side pages*/}
      <Route path="/employee-account" element={<EmployeeAccount />} />
      <Route path="/pending-appointments" element={<PendingAppointments />} />
      <Route path="/assigned-appointments" element={<AssignedAppointments />} />
      <Route path="/employee-service-history" element={<EmployeeServiceHistory/>}/>

      {/*Admin side pages*/}
      <Route path="/admin-account" element={<AdminAccount />} />
      <Route path="/edit-services" element={<EditServices />} />
      <Route path="/admin-service-history" element={<AdminAccount />} /> {/*Once we make the service history page for the admin side, replace element here*/}
      <Route path="/employee-log" element={<AdminAccount />} /> {/*Once we make the employee log page for the admin side, replace element here*/}
      <Route path="/manage-employees" element={<Employees />} />
    </Routes> 
  );
}

export default App;
