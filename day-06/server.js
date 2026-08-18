//start serever
// connect with database

const app = require("./src/app");
const mongoose = require("mongoose");
require("dotenv").config();

const ConnectToDB = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Connected to database");
    })
    .catch((err) => {
      console.log("Database connection failed", err);
    });
};

ConnectToDB();

app.listen(3000, () => {
  console.log("server running on port http://localhost:3000");
});
