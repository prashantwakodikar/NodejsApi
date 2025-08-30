const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required:[true, "Firstname is required"],
        minLength:[3, "Firstname should have minimum three character"],
        maxLength:[15, "Firstname character should have maximum 15 character"],
        validate:{
            validator:function(v){
                return /^[a-zA-Z0-9]+$/.test(v);
            },
            message: props => `${props.value} special character is not allowed`
        }
    },
    lastName:{
        type:String,
        match:[/^[a-zA-Z0-9]+$/, "Special character is not allowed"],
        trim:true
    },
    email:{
        type:String,
        required:true,
        lowercase:true,
        trim:true,
        unique:[true, "Duplicate Email Id is not allowed"]
    },
    age:{
        type:Number
    },
    gender:{
        type:String,
        lowercase:true,
        enum:{
            values:["male", "female"],
            message:'{VALUE} is not supported'
        }
    }

}, { timestamps:true});

const User = mongoose.model("User", UserSchema);

module.exports = User;