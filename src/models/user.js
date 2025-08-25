const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required:true
    },
    lastName:{
        type:String
    },
    email:{
        type:String,
        required:true,
        lowercase:true,
        trim:true,
        unique:true
    },
    age:{
        type:Number
    },
    gender:{
        type:String
    }

}, { timestamps:true});

const User = mongoose.model("User", UserSchema);

module.exports = User;