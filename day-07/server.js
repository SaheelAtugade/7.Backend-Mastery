require("dotenv").config();
const app = require("./src/app");
const connectToDB = require("./src/config/database");

// Database connection
connectToDB();

// starting a server
const port = 3000;
app.listen(port, () => {
  console.log(`server running on http://localhost:${port}`);
});
