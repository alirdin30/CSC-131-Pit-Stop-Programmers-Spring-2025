import Navigation from "../components/Navigation";
import { Link } from "react-router-dom";
import BlueButton from "../components/BlueButton";
import InputBox from "../components/InputBox";
import { useState } from "react";

const CustomerLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  return (
    <div className="customer-login-page">
      <Navigation />

      <section className="customer-login">
        <h1>Customer Login</h1>
        <InputBox
          label="Email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputBox
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Link to="/forgot-password" className = "forgot-password-link">Forgot Your Passwrod?</Link>
        <BlueButton text="Login" />
      </section>
    </div>
  );
}

export default CustomerLogin;