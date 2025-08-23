const express = require('express');

const app = express();

// app.use("/user", (req, res, next)=>{
//     // res.send("Hahahaha");
//     next();
// });


app.post("/user", (req, res)=>{
    res.send("This save users data");
});

app.get("/user/:username/:password", (req, res)=>{
    // Read Query string from URL 
    // const data = req.query;

    // Read Params from URL
    const data = req.params;
    console.log(data);
    res.send(data);
});

app.delete("/user", (req, res)=>{
    res.send("This will delete users data")
});


app.listen("3000", ()=>{
    console.log("server is up and running");
});