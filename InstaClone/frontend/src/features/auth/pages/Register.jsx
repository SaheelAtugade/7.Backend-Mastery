import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Register = () => {
  const { handleRegister, loading } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleRegister(username, email, password);
      navigate("/");
    } catch (error) {}
  };

  return (
    <div className="page">
      <div className="form-container">
        <h1>Create an account</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Enter username"
            onInput={(e) => setUsername(e.target.value)}
          />
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Enter email"
            onInput={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            name="password"
            id="password"
            placeholder="Enter password"
            onInput={(e) => setPassword(e.target.value)}
          />
          <button className="button primary-button" type="submit">
            Register
          </button>
        </form>
        <p>
          Already have an account? <Link to="/login">login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
