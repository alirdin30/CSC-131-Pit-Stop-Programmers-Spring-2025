import Navigation from "../components/Navigation";
import BlueButton from "../components/BlueButton";
import InputBox from "../components/InputBox";
import { useState } from "react";
import user from "../../../server/model/user";

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="register-page">
      <Navigation />

      <section className="register">
        <h1>Register</h1>
        <InputBox
          label="Username"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
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