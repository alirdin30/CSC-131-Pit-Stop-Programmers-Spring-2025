import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import PSPLogo from '../assets/PitStopProgrammersImages/PSPLogo.png';

const Navigation = () => {
  const { userRole, setUserRole } = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post('/api/auth/logout', {}, { withCredentials: true });
      setUserRole(null); // Clear the user role in context
      navigate('/login'); // Redirect to the login page
    } catch (error) {
      console.error('Logout failed:', error.response?.data?.message || error.message);
    }
  };

  const getAccountLink = () => {
    // If the user is on their account page, show "Logout"
    if (
      location.pathname === '/customer-account' ||
      location.pathname === '/employee-account' ||
      location.pathname === '/admin-account'
    ) {
      return (
        <button className="hover-underline logout-button" onClick={handleLogout}>
          Logout
        </button>
      );
    }

    // If the user is on the login page, show a link to the register page
    if (location.pathname === '/login') {
      return <Link to="/register" className="hover-underline">Register</Link>;
    }

    // Otherwise, show the appropriate account link
    if (userRole === 'customer') return <Link to="/customer-account" className="hover-underline">Account</Link>;
    if (userRole === 'employee') return <Link to="/employee-account" className="hover-underline">Account</Link>;
    if (userRole === 'admin') return <Link to="/admin-account" className="hover-underline">Account</Link>;
    return <Link to="/login" className="hover-underline">Sign In</Link>; // Default to login if not logged in
  };

  return (
    <nav>
      <div className="logo">
        <Link to="/" className="logo">
          <img src={PSPLogo} alt="Website Logo" />
        </Link>
      </div>
      <ul>
        <li><Link to="/about" className="hover-underline">About Us</Link></li>
        <li><Link to="/services" className="hover-underline">Services Offered</Link></li>
        <li>{getAccountLink()}</li>
      </ul>
    </nav>
  );
};

export default Navigation;
