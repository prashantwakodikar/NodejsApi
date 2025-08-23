const express = require('express');

const app = express();


app.use("/admin", (req, res) =>{
    res.send("This is admin page");
});

app.use("/home",(req, res) =>{
    res.send("This is home page");
});

app.use("/",(req, res) =>{
    res.send("This is wild card route");
});


app.listen("3000", ()=>{
    console.log("server is up and running");
});