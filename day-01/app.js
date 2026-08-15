// console.log("Hello, World!");
// const catMe = require('cat-me');
// const cat = catMe();
// console.log(cat);

const express = require('express');
const app = express();

app.get("/",(req, res)=>{
    res.send("My first server");
})

app.listen(5000,()=>{console.log("server running on port : 5000")})