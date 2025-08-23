const express = require('express');
const app = express();
const {errorHandler} = require("./middlewares/error");
const {Auth} = require("./middlewares/auth");

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

// app.use((err, req, res, next) => {
//     if (err) {
//         res.send("Global error handler - Something went wrong!!");
//     }
// });

app.use(errorHandler);

app.listen("3000", () => {
    console.log("server is up and running");
});