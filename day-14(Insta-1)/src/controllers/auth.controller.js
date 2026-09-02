const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const bcrypt = require("bcryptjs")

async function registerController (req, res) {
  const { username, email, password, bio, profile_image } = req.body;

  //check user exist by email or username using $or:[]
  const isUserAlreadyExist = await userModel.findOne({
    $or: [{ username }, { email }],
  });
  if (isUserAlreadyExist) {
    return res.status(409).json({
      message:
        "User already exists " +
        (isUserAlreadyExist.email === email
          ? "with this email"
          : "with this username"),
    });
  }
  //Hash password
  const hash = await bcrypt.hash(password, 10)

  //Save user to DB
  const user = await userModel.create({
    username,
    email,
    password: hash,
    bio,
    profile_image,
  });

  //Create token
  const token = jwt.sign(
    {
      id: user._id,
    },
    config.JWT_SECRETE,
    {
      expiresIn: "1d",
    },
  );

  //Store token in cookie storage
  res.cookie("jwt_token", token);

  //Success response
  res.status(201).json({
    message: "User registered successfully",
    user: {
      username: user.username,
      email: user.email,
      bio: user.bio,
      profile_image: user.profile_image,
    },
  });
}

async function loginController(req, res) {
  const { username, email, password } = req.body;

  //find user by email or username whatever  user have given = email : "a@a.com", username: undefined || username: "test", email: undefined
  //$or:[]
  const user = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  //no user found
  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  //password match
  const isPasswordValid = await bcrypt.compare(password, user.password)
  if (!isPasswordValid) {
    return res.status(401).json({
      message: "Invalid password",
    });
  }

  //create new token
  const token = jwt.sign(
    {
      id: user._id,
    },
    config.JWT_SECRETE,
    {
      expiresIn: "1d",
    },
  );

  //Save token on cookie
  res.cookie("jwt_token", token);

  //success response
  res.status(200).json({
    message: "User logged in successfully",
    user: {
      username: user.username,
      email: user.email,
      bio: user.bio,
      profile_image: user.profile_image,
    },
  });
}

module.exports = {
    registerController,
    loginController
}