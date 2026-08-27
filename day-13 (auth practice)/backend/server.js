// start server and Db connection
require('dotenv').config()
const app = require('./src/app');
const connectToDB = require('./src/config/database');

//Database connection
connectToDB()

app.listen(3000,()=>{
    console.log("server running on port 3000");
})