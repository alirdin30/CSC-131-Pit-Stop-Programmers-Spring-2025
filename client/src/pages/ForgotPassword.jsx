import Navigation from "../components/Navigation";
import BlueButton from "../components/BlueButton";
import InputBox from "../components/InputBox";
import { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleForgotPassword = async () => {
    try {
      const response = await axios.post('/api/auth/forgot-password', { email });
      setMessage(response.data.message);
      setIsSuccess(true);
    } catch (error) {
      if (error.response && error.response.data.message) {
        setMessage(error.response.data.message);
      } else {
        setMessage("An unexpected error occurred. Please try again.");
      }
      setIsSuccess(false);
    }
  };

  return (
    <div className="forgot-password-page">
      <Navigation />

      <section className="forgot-password">
        <h1>Enter Email to reset password</h1>
        <InputBox
          label="Email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <BlueButton text="Get Reset Link" onClick={handleForgotPassword} />
        {message && (
          <p className={isSuccess ? "successMessage" : "errorMessage"}>{message}</p>
        )}
      </section>
    </div>
  );
}

export default ForgotPassword;