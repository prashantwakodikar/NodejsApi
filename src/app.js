const express = require('express');
const app = express();
require('dotenv').config();

const {dbConnect} = require("./configs/db");
const {errorHandler} = require("./middlewares/error");
const Auth = require("./middlewares/Auth");
const User = require("./models/user");

app.use(express.json());

app.post("/user", Auth, async (req, res) => {
    try {
        const userData = new User(req.body);
        await userData.save(); 
        res.send("Saved users data, check DB");
    } catch (error) {
        console.error("Unable to save user data");
        res.status(400).json({
            httpCode: 400,
            message: error.message
        });
    }
    
});

app.get("/user", async (req, res) => {
    // try {
        // const userId = req.query.userId;
        // if (!userId) {
        //     throw new Error("user id not sent");
        // }
        const userList = await User.find({});
        res.send(userList);
    // } catch (error) {
    //     res.status(500).send(error.message);
    // }

});

//Global Error Handler
app.use(errorHandler);

// Start Express server only after DB connection
dbConnect().then( async ()=>{
    await User.init();
    console.log("Indexes is created");
    app.listen("3000", () => {
        console.log("server is up and running");
    });
});
