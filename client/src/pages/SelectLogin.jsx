import Navigation from '../components/Navigation';
import BlueButton from '../components/BlueButton';
import { useNavigate } from 'react-router-dom';

const SelectLogin = () => {
  const navigate = useNavigate();

  return (
    <div className="select-login-page">
      <Navigation />

      <section className="select-login">
        <h1>Select login</h1>
        <BlueButton text="Login as Customer" onClick={() => navigate("/customer-login")} />
        <BlueButton text="Login as Employee" onClick={() => navigate("/employee-login")} />
        <BlueButton text="Login as Admin" onClick={() => navigate("/admin-login")} />
      </section>
    </div>
  );
};

export default SelectLogin;