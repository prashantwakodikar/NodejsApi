const express = require('express');
const app = express();
require('dotenv').config();

const {dbConnect} = require("./configs/db");
const {errorHandler} = require("./middlewares/error");
const Auth = require("./middlewares/Auth");
const User = require("./models/user");

app.use(express.json());


app.post("/signup", Auth, async (req, res) => {
    try {
        const userData = new User(req.body);
        const updatedUserInfo = await userData.save(); 
        // console.log(updatedUserInfo);
        // return res.send("User info saved successfully");
        return res.status(200).json({
            httpCode: 200,
            message:"User info saved successfully",
            data:updatedUserInfo
        });
        // console.info("Is this line getting executed !!");
    } catch (error) {
        // console.error("Unble to login due to some error message");
        return res.status(400).json({
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
