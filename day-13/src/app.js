//creating server and configurations

const express = require('express');
const app = express()
const authRoute = require('./routes/auth.route');
const cookieParser = require('cookie-parser');

app.use(express.json()); //allow read req.body
app.use(cookieParser()) // allow storing data in cookie
app.use('/api/auth',authRoute)// post method on /api/auth/register

module.exports = app;