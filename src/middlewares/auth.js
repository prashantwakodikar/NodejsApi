const Auth = (req, res, next) =>{
    console.log("Validate if user is authenticated or not");
    
    const token = "123";
    const isAuthenticated = token==="abc";
    if(isAuthenticated){
        next();
    }else{
        res.status(401).send("Unauthorise request");
    }
}

module.exports = {
    Auth
}