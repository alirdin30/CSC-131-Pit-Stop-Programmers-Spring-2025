import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import PSPLogo from '../assets/PitStopProgrammersImages/PSPLogo.png';

const Navigation = () => {
  const { userRole, setUserRole } = useContext(UserContext);
  const location = useLocation();// Get current page location
  const navigate = useNavigate();// Hook to navigate between pages
  
  // Check authentication status when component mounts
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get('/api/auth/status', { withCredentials: true });
        if (response.data.user) {
          setUserRole(response.data.user.role);
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
      }
    };
    
    checkAuthStatus();
  }, [setUserRole]);

  const handleLogout = async () => {
    try {
      await axios.post('/api/auth/logout', {}, { withCredentials: true });
      setUserRole(null); // Clear the user role in context
      navigate('/login'); // Redirect to the login page
    } catch (error) {
      console.error('Logout failed:', error.response?.data?.message || error.message);
    }
  };

  // Function to determine which account-related link to display
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
      {/* Website Logo linking to Home Page */}
      <div className="logo">
        <Link to="/" className="logo">
          <img src={PSPLogo} alt="Website Logo" />
        </Link>
      </div>
      {/* Navigation menu with links to different pages */}
      <ul>
        <li><Link to="/about" className="hover-underline">About Us</Link></li>
        <li><Link to="/services" className="hover-underline">Services Offered</Link></li>
        {userRole === 'admin' && (
          <li><Link to="/employees" className="hover-underline">Employees</Link></li>
        )}
        <li>{getAccountLink()}</li>
      </ul>
    </nav>
  );
};

export default Navigation;
