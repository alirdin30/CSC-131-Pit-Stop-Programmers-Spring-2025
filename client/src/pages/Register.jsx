import Navigation from "../components/Navigation";
import BlueButton from "../components/BlueButton";
import InputBox from "../components/InputBox";
import { useState } from "react";

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <BlueButton text="Register" />
      </section>
    </div>
  );
}

export default Register;