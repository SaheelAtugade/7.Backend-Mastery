const mongoose = require('mongoose');
const config = require('./config');

const connectToDB = ()=>{
    mongoose.connect(config.MONGO_URI)
    .then((res)=>{
        console.log("Database connected successfully...");
    })
    .catch((err)=>{
        console.log("Database connection failed...");
    })
}

module.exports = connectToDB