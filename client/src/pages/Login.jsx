import Navigation from "../components/Navigation";
import { Link, useNavigate } from "react-router-dom";
import BlueButton from "../components/BlueButton";
import InputBox from "../components/InputBox";
import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("/api/auth/login", {
        email,
        password,
      }, { withCredentials: true }); // Include cookies for session handling

      const { role } = response.data.user;

      // Redirect based on the user's role
      if (role === "customer") {
        navigate("/customer-account");
      } else if (role === "employee") {
        navigate("/employee-account");
      } else if (role === "admin") {
        navigate("/admin-account");
      }
    } catch (error) {
      if (error.response && error.response.data.errors) {
        setMessage(error.response.data.errors[0].msg);
      } else if (error.response && error.response.data.message) {
        setMessage(error.response.data.message); // Display other error messages from the server
      } else {
        setMessage("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="login-page">
      <Navigation />

      <section className="login">
        <h1>Login</h1>
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
        <Link to="/forgot-password" className="forgot-password-link">Forgot Your Password?</Link>
        <BlueButton text="Login" onClick={handleLogin} />
        {message && <pre className="errorMessage">{message}</pre>}
      </section>
    </div>
  );
};

export default Login;