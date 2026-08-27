const express = require("express");
const authRoute = express.Router();
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

/* 
    /api/auth/register
*/
authRoute.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  //email exist check
  const isEmailAlreadyExist = await userModel.findOne({ email });
  if (isEmailAlreadyExist) {
    return res.status(400).json({
      message: "User with this email already exist",
    });
  }

  const hash = crypto.createHash("md5").update(password).digest("hex");

  //creating user in DB
  const user = await userModel.create({
    name,
    email,
    password: hash,
  });

  //Creating JWT token
  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRETE,
  );

  //Storing JWT token in cookie storage
  res.cookie("jwt_token", token);

  res.status(201).json({
    message: "User created successfully",
    user,
    token,
  });
});

/* 
  /api/auth/protected
*/
authRoute.post("/protected", (req, res) => {
  console.log(req.cookies); //undefined

  res.status(200).json({
    message: "This is protected route", //this is showing good
  });
});

/* 
    /api/auth/login
*/
authRoute.post("/login", async (req, res) => {
  const { email, password } = req.body;

  //get user data
  const user = await userModel.findOne({ email });

  //check user exist?
  if (!user) {
    return res.status(404).json({
      message: "user not found with this email",
    });
  }

  //match password
  const hash = crypto.createHash("md5").update(password).digest("hex");
  const passwordMatched = user.password === hash;

  if (!passwordMatched) {
    return res.status(401).json({
      message: "Invalid Password",
    });
  }

  //generate new token
  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRETE,
  );

  //save token to cookie
  res.cookie("jwt_token", token);

  //login response
  res.status(200).json({
    message: "user logged in successfully",
    user,
  });
});

module.exports = authRoute;
