import axios from "axios";
import React, { useState } from "react";

const Register = (e) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    
    axios.post("http://localhost:3000/api/auth/register",{
      name, email, password
    },{
    withCredentials: true
  })
    .then((res)=>{
      console.log(res);
    }).catch((err)=>{
      console.log(err);
    })
    
    setName("")
    setEmail("")
    setPassword("")
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="input-field">
          <label htmlFor="">Name:</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className="input-field">
          <label htmlFor="">Email:</label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="input-field">
          <label htmlFor="">Password:</label>
          <input
            type="text"
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
          />
        </div>
        <button type="submit">register</button>
      </form>
    </div>
  );
};

export default Register;
