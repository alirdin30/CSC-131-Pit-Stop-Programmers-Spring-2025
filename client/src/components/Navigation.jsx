import { Link, useLocation } from 'react-router-dom';
import PSPLogo from '../assets/PitStopProgrammersImages/PSPLogo.png';

const Navigation = () => {
  const location = useLocation();
  const isAccountPage = location.pathname === '/account';

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
        <li>
          {isAccountPage ? (
            <Link to="/register" className="hover-underline">Register</Link>
          ) : (
            <Link to="/account" className="hover-underline">Sign In</Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
