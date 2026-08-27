import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate()
  return (
    <nav>
        <div className="links">
            <Link to="/">Home</Link>
            <Link to="/profile">Profile</Link>
        </div>
        <div className="btns">
            <button onClick={()=>{navigate('/login')}}>Login</button>
            <button onClick={()=>{navigate('/register')}}>Register</button>
        </div>
    </nav>
  )
}

export default Navbar