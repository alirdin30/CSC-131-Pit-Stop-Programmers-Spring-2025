import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutUs from './pages/AboutUs';
import SelectLogin from './pages/SelectLogin';
import './App.css';
import CustomerLogin from './pages/CustomerLogin';
import CustomerAccount from './pages/CustomerAccount';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/select-login" element={<SelectLogin />} />
        <Route path="/customer-login" element={<CustomerLogin />} /> 
        <Route path="/services" element={<HomePage />} /> {/* TODO: Create Services page */}
        <Route path="/register" element={<Register />} /> 
        <Route path="/customer-account" element={<CustomerAccount />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
