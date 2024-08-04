import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }
    console.log("User Registered:", email, password);
    navigate("/"); // Redirect to the login page
  };

  return (
    <div className="login-form">
      <h1>Register Here</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
        />
        <input type="text" placeholder="Enter your full name"></input>
        <input type="text" placeholder="Enter your full address"></input>
        <input type="text" placeholder="Enter your mobileno for OTP communication"></input>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm password"
        />
        
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
