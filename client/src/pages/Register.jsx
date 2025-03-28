import Navigation from "../components/Navigation";
import BlueButton from "../components/BlueButton";
import InputBox from "../components/InputBox";
import { useState } from "react";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false); // Track if the message is a success or error

  const handleRegister = async () => {
    try {
      const response = await axios.post("/api/user", {
        name,
        email,
        password,
      });
      setMessage(response.data.message); // Display success message
      setIsSuccess(true); // Mark the message as a success
    } catch (error) {
      if (error.response && error.response.data.errors) {
        setMessage(error.response.data.errors[0].msg); // Display validation error
      } else if (error.response && error.response.data.error) {
        setMessage(error.response.data.error); // Display server error
      } else {
        setMessage("An unexpected error occurred.");
      }
      setIsSuccess(false); // Mark the message as an error
    }
  };

  return (
    <div className="register-page">
      <Navigation />

      <section className="register">
        <h1>Register</h1>
        <InputBox
          label="Email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputBox
          label="Name"
          placeholder="Enter your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <InputBox
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <BlueButton text="Register" onClick={handleRegister} />
        {message && (
          <p className={isSuccess ? "successMessage" : "errorMessage"}>{message}</p>
        )}
      </section>
    </div>
  );
};

export default Register;