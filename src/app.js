const express = require('express');
const app = express();
require('dotenv').config();

const { dbConnect } = require("./configs/db");
const { errorHandler } = require("./middlewares/error");
const {Authenticate, GenerateToken} = require("./middlewares/Auth");
const User = require("./models/user");
const bcrypt = require("bcrypt");
const {loginValidation} = require("./utils/validation");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
    try {
        const userData = new User(req.body);
        // const myPlaintextPassword = userData.password;

        // Before save encrypt the password and then save to db 
        bcrypt.hash(userData.password, 10, async function (err, hash) {
            console.log("hash ====", hash);
            userData.password = hash;
            const updatedUserInfo = await userData.save();

            return res.status(200).json({
                httpCode: 200,
                message: "User info saved successfully",
                data: updatedUserInfo
            });
        });

        // return res.send("User info saved successfully");        
        // console.info("Is this line getting executed !!");
    } catch (error) {
        // console.error("Unble to login due to some error message");
        return res.status(400).json({
            httpCode: 400,
            message: error.message
        });
    }

});

app.get("/user",Authenticate, async (req, res) => {
    // try {
    const userList = await User.find({});
    return res.send(userList);
    // } catch (error) {
    //     res.status(500).send(error.message);
    // }

});

app.get("/profile", Authenticate, async(req, res) =>{
    try {
        // check the token
        // const cookies = req.cookies;
        // const {token} = cookies;
        // if(!token){
        //     throw new Error("Invalid Token");
        // }
        // // validate the token 
        // const decodedMessage = jwt.verify(token, process.env.TOKEN_SECRET);
        // console.log("decoded Message", decodedMessage);
        // const {_id} = decodedMessage;
        // console.log("user id ", _id);
        
        // read the token and get user id and fetch details from db and return 
        // const userProfile = await User.findById(req._id);
        // if(!userProfile){
        //     throw new Error("User does not exists");
        // }
        // if token is invalid throw error 
        res.send(req.user);        
    } catch (error) {
        res.status(400).send(error.message);
    }

});

app.post("/login", loginValidation, async (req, res) => {

    try {
        // check username and password is received 
        // console.log(req.body);
        // check request body and validated its fields
        // loginValidation(req);

        const { emailId, password } = req.body; 

        const user = await User.findOne({emailId:emailId});

        if(!user){
            return res.status(401).send("User is not found");
        }
        console.log("user data from db", user);

        // Load hash from your password DB.
        const passwordIsValid = await bcrypt.compare(password, user.password);
        if(!passwordIsValid){
            return res.status(401).send("Invalid Credentials!!");
        }
        // console.log("process.env.TOKEN_SECRET", process.env.TOKEN_SECRET);

        // create jwt token 
        GenerateToken(user, req, res);
        // const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
        // console.log("jwt token", token);

        // once user is validated create jwt token and attach to cookie
        // res.cookie('token', token)

        //retun success or failure response
        return res.send("Logged in succesfully");
    } catch (error) {
        return res.status(400).json({message: error.message});
    }
    // validate the username and password is correct with DB



});

//Global Error Handler
app.use(errorHandler);

// Start Express server only after DB connection
dbConnect().then(async () => {
    // await User.init();
    console.log("Indexes is created");
    app.listen("3000", () => {
        console.log("server is up and running");
    });
});
