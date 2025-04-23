import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import Navigation from "../components/Navigation";
import InputBox from "../components/InputBox";
import BlueButton from "../components/BlueButton";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Extract the token from the URL
  const token = searchParams.get("token");

  const handleResetPassword = async () => {
    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      setIsSuccess(false);
      return;
    }

    try {
      const response = await axios.post("/api/auth/reset-password", {
        token,
        password,
      });

      setMessage(response.data.message);
      setIsSuccess(true);

      // Redirect to login page after a delay
      setTimeout(() => navigate("/login"), 3000);
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
    <div className="reset-password-page">
      <Navigation />

      <section className="reset-password">
        <h1>Reset Your Password</h1>
        <InputBox
          label="New Password"
          placeholder="Enter your new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <InputBox
          label="Confirm Password"
          placeholder="Confirm your new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <BlueButton text="Reset Password" onClick={handleResetPassword} />
        {message && (
          <p className={isSuccess ? "successMessage" : "errorMessage"}>{message}</p>
        )}
      </section>
    </div>
  );
};

export default ResetPassword;