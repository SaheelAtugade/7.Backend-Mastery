const express = require('express')
const app = express();
const port = 3000;

app.get('/',(req, res)=>{
    res.send("Server running...")
})

app.get('/home',(req, res)=>{
    res.send("home page");
})

app.listen(3000,()=>{
    console.log(`server running on http://localhost:${port}`);
})