const Auth = (req, res, next)=>{
    // console.log("validate token");
    const token ="xyz";
    const isAuthenitcate = token === "xyz"
    if(isAuthenitcate){
        next();
    }else{
        res.status(401).send("Unauthorised");
    }
}

module.exports = Auth;