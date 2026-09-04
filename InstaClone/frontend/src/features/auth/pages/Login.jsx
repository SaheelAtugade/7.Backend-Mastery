import React, { useState } from "react";
import {Link} from "react-router-dom"
import "../style/form.scss";
import axios from "axios";

const Login = () => {
const [username, setUsername] = useState("")
const [password, setPassword] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        {
          username,
          password
        },
        {
          withCredentials: true
        }
      );
      console.log(response.data);
    } catch (err) {
      console.log(err.response.data.message);
    }

    setUsername("");
    setPassword("");
  };

  return (
    <main>
      
      <div className="form-container">
        <h2>Login to account</h2>
        <form onSubmit={(e)=>{handleSubmit(e)}}>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Enter username"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
          />
          <input
            type="text"
            name="password"
            id="password"
            placeholder="Enter password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
        <div className="form-links">
          <p>
            New here? <Link className='toggleAuthForm' to="/register">Create new account</Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default Login;
