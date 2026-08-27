import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState(null);

  const getUser = async () => {
    try{
      const res = await axios
      .get("http://localhost:3000/api/auth/get-me", {
        withCredentials: true,
      })
      setUser(res.data)
    }catch(err){
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="profile-info">
      {user ? (
        <div>
          <h2>{user.name}</h2>
          <h4>{user.email}</h4>
        </div>
      ) : (
        <p>You are not logged in</p>
      )}
    </div>
  );
};

export default Profile;
