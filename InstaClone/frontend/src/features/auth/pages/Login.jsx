import React, { useState } from "react";
import "../style/form.scss";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const { handleLogin, loading } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleLogin(username, password);
      navigate("/");
    } catch (error) {}
  };

  return (
    <div className="page">
      <div className="form-container">
        <h1>Login to account</h1>
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
            name="password"
            id="password"
            placeholder="Enter password"
            onInput={(e) => setPassword(e.target.value)}
          />
          <button
            disabled={loading}
            className="button primary-button"
            type="submit"
          >
            {loading ? "loading..." : "Login"}
          </button>
        </form>
        <p>
          Don't have an account? <Link to="/register">create an account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
