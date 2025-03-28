import Navigation from "../components/Navigation";
import BlueButton from "../components/BlueButton";
import InputBox from "../components/InputBox";
import { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

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
        <BlueButton text="Get Reset Link" />
      </section>
    </div>
  );
}

export default ForgotPassword;