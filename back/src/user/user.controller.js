const User = require('./user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();



const register = async (req, res) =>{
    try{
        const {email, password} = req.body;
        const tmp = await User.findOne({email});
        if (tmp){
            res.status(409).send("user already exists")
        }
        else{
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await User.create({email, password : hashedPassword});
            console.log("register successfulll")
            // res.send(user);
        }
    } catch(error){
        console.log(error.message);
        res.send(error.message);
    }
};



const login = async (req, res) =>{
    try{
        const {email, password} = req.body;
        const user  = await User.findOne({email});
        if (!user){
            res.status(401).json({error : "authentication failed"});
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch){
           res.status(401).json({error : "password doesn't match"})
        }
        const token = jwt.sign({'userId' : user._id}, process.env.JWT_SECRET_KEY)
        console.log("token : ", token);
        res.cookie("token", token);
        res.send({token})
    }

    catch(error){
        res.send(error.message);
    }
};



module.exports = {register, login};