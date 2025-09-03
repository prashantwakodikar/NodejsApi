const validatorLib = require("validator");

const allowedLoginFields = ["emailId", "password"];

const loginValidation = (req, res, next) =>{
    // console.log("req?.body", req?.body);
    if(req?.body){
        const payloadKeys = Object.keys(req.body);
        const validPayload = allowedLoginFields.every(key => payloadKeys.includes(key));
        
        if(!validPayload || allowedLoginFields.length !== payloadKeys.length){
            return res.status(400).json({ error: 'Please send correct payload' });
        }
        if(!validatorLib.isEmail(req.body.emailId)){
            return res.status(400).json({ error: 'Invalid email id' });
        }
        next();
    }else{
        return res.status(400).json({ error: 'Invalid payload' });
    }
}

module.exports = {
    loginValidation
}