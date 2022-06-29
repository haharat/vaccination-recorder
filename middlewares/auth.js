const jwt = require("jsonwebtoken")
require("dotenv").config();
const UserModel = require("../models/user");

const protect = async(req, res, next)=>{
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try{
            token=req.headers.authorization.split(" ")[1];
            const decode = jwt.verify(token, process.env.jwtSecret);
            req.user = await UserModel.findById(decode.id).select("-password");
            next();
        } catch(error){
            console.log(error)
            res.status(401).send({message: "You are not authorized to operate"})
        }
    }

    if(!token){
        res.status(401).send({message: "No token found. Register first"})
    }
}

module.exports = protect