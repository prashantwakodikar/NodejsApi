const jwt = require("jsonwebtoken");
const User = require("../models/user");

const Authenticate = async (req, res, next)=>{
    // console.log("validate token");
    try {
        const cookies = req.cookies;
        const {token} = cookies;
        console.log("check the token", token);
        if(!token){
            return res.status(401).send("Invalid token");
        }
        
        //verify the token 
        const decodedMessage = jwt.verify(token, process.env.TOKEN_SECRET);
        console.log("decoded Message", decodedMessage);
    
        const {_id} = decodedMessage;
        const user = await User.findById(_id);
        if(!user){
            return res.status(400).send("User not found");
        }
        req.user = user;
        next();        
    } catch (error) {
        res.status(400).send(error.message);
    }

}


const GenerateToken = async (user, req, res) =>{
    try {
        const token = jwt.sign({_id:user._id}, process.env.TOKEN_SECRET);
        res.cookie("token",token);
        // req.user = user;            
    } catch (error) {
        res.send("Error"+error.message);
    }
}

module.exports = {
    Authenticate,
    GenerateToken
};