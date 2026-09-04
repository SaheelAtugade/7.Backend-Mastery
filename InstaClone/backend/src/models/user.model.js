const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: [true, "Username already exist"],
    required: [true, "Username is required"],
  },
  email: {
    type: String,
    unique: [true, "Email already exist"],
    required: [true, "Email is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  bio: String,
  profile_image: {
    type: String,
    default: "https://ik.imagekit.io/amkgfdixog/profilePic.jpg"
  },
});

const userModel = mongoose.model("users",userSchema)
module.exports = userModel;
