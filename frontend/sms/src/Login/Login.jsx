import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import "./Login.css";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform login logic here
    if (email === "test@example.com" && password === "password") {
      // Navigate to newadmission page on successful login
      onLogin(true);
    } else {
      alert("Invalid email or password");
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    navigate("/signup");
  };

  return (
    <div className="wrapper">
      <form className="formmain" onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div className="input-container">
          <FaUser className="icon" />
          <input
            type="text"
            placeholder="Username"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-container">
          <FaLock className="icon" />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="remember-forgot">
          <label>
            <input type="checkbox" /> Remember me
          </label>
          <a href="#">Forgot Password</a>
        </div>

        <div className="submit-btn">
        <button type="submit">Login</button>
        </div>

        <div className="register-link">
          <p>
            Don't have an account?<a href="#" onClick={handleSignup}> Register</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
