const User = require('./user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const register = async (req, res) =>{
    try{
        const {username, password} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({username, password : hashedPassword});
        res.send(user);
    } catch(error){
        console.log("error");
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
        const token = jwt.sign({'userId' : user._id}, 'salah', {expiresIn : '1h'})
        res.status(200).json(token);
    }
    catch(error){
        res.send(error.message);
    }
};



module.exports = {register, login};