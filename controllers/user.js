const UserModel = require("../models/user");
const generateToken = require("../utils/generateToken");

const registerUser = async(req, res) => {
    try{
        const {username, email, password, fullname, gender, birthday} = req.body
        const userExists = await UserModel.findOne({email: email})
        if(userExists){
            res.status(400).send({message: "User already exists"})
        }

        const user = await UserModel.create({
            username: username,
            email: email,
            password: password,
            fullname: fullname,
            birthday: birthday,
            gender: gender, 
        })

        if (user) {
            res.status(201).json({
              id: user._id,
              username: user.username,
              email: user.email,
              fullname: user.fullname,
              birthday: user.birthday,
              gender: user.gender,              
              token: generateToken(user._id),
            });
          } else {
            res.status(400).send({ message: "Invalid user data" });
          }
    } catch(error) {
        console.log("User registration error", error);
    }
}

const login = async (req, res) => {
    const { username, fullname, password, birthday } = req.body;
    const user = await UserModel.findOne({ username: username });
    if (user && (await user.matchPassword(password))) {
      res.status(200).json({
        id: user._id,
        username: user.username,
        fullname: user.fullname,
        birthday: user.birthday,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).send({ message: "Invalid username or password" });
    }
  };
  
  module.exports = { registerUser, login };