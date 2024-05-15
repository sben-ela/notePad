const User = require('./user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();



const register = async (req, res) =>{
    try{
        console.log(req.body)
        const {username, password} = req.body;
        const tmp = await User.findOne({username});
        if (tmp){
            res.status(409).send("user already exists")
        }
        else{
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await User.create({username, password : hashedPassword});
            res.send(user);
        }
    } catch(error){
        console.log(error.message);
        res.send(error.message);
    }
};



const login = async (req, res) =>{
    try{
        const {username, password} = req.body;
        const user  = await User.findOne({username});
        if (!user){
            res.status(401).json({error : "authentication failed"});
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch){
           res.status(401).json({error : "password doesn't match"})
        }
        const token = jwt.sign({'userId' : user._id}, process.env.JWT_SECRET_KEY)
        res.cookie("token", token);
        res.send("login succeful")
    }

    catch(error){
        res.send(error.message);
    }
};



module.exports = {register, login};