const JWT = require("jsonwebtoken");
const JWT_Secret = "NilanjanalovesArindam"; //JWT signature

const fetchuser=(req, res, next)=>{
    //Get the user from the JWT token and add id to the req object
    const token=req.header('auth-token')
    if(!token){
        res.status(401).send({error:"Did not find any token. Please enter correctly"})
    }
    else{
        try {
            const data=JWT.verify(token, JWT_Secret)
            req.user=data.user
            next()    
        } catch (error) {
            res.status(401).send({error:"Did not find any token. Please enter correctly(catch)"})
        }
    }
}

module.exports=fetchuser