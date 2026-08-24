//starting server and database connection
const app = require('./src/app')
require('dotenv').config()
const connectToDB = require('./src/config/database')

connectToDB();

app.listen(3000, ()=>{
    console.log("server running on http://localhost:3000")
})