const express = require('express');
const app = express();
const {dbConnect} = require("./configs/db");
const {errorHandler} = require("./middlewares/error");
const Auth = require("./middlewares/Auth");

app.post("/user", Auth, (req, res) => {
    res.send("This save users data");
});

app.get("/user", (req, res) => {
    // try {
        const userId = req.query.userId;
        if (!userId) {
            throw new Error("user id not sent");
        }
        res.send("Got the userid and will user data");
    // } catch (error) {
    //     res.status(500).send(error.message);
    // }

});

//Global Error Handler
app.use(errorHandler);

// Start Express server only after DB connection
dbConnect().then( ()=>{
    app.listen("3000", () => {
        console.log("server is up and running");
    });
});
