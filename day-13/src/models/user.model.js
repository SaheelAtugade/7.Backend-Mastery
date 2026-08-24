const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: [true, "user with this Email already exist"] //avoid duplicate email throw error mssg 
    },
    password: String
})

const userModel = mongoose.model("users",userSchema);
module.exports = userModel;