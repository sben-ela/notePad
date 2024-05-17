const User = require('./user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();



const register = async (req, res) =>{
    try{
        const {email, password} = req.body;
        const tmp = await User.findOne({email});
        if (tmp){
            res.status(409).json({error : "user already exists"})
        }
        else{
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await User.create({email, password : hashedPassword});
            return res.send(user);
        }
    } catch(error){
        res.status(500).send(error.message);
    }
};



const login = async (req, res) =>{
    try{
        const {email, password} = req.body;
        const user  = await User.findOne({email});
        if (!user){
            return res.status(401).json({error : "authentication failed"});
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch){
           return res.status(401).json({error : "password doesn't match"})
        }
        const token = jwt.sign({'userId' : user._id}, process.env.JWT_SECRET_KEY)
        res.cookie("token", token);
        return res.send({token})
    }

    catch(error){
        res.status(500).send(error.message);
    }
};

const checkAuthenticated = async (req, res)=>{
    try{
        console.log("here")
        jwt.verify(req.cookies.token, process.env.JWT_SECRET_KEY);
        res.status(200).send();
      }
      catch(error){
        res.status(403).send();
      }
}

module.exports = {register, login, checkAuthenticated};