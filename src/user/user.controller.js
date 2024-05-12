const {v4 : uuidv4} = require('uuid');
const User = require('./user.model');

async function signUp(req, res) {
    try{
        const userId = uuidv4();
        const user = await User.create({ ...(req.body), _id : userId});
        
        res.cookie('userId', userId, {maxAge : '600000'})
        res.status(201).send(user);
    }
    catch{
        console.log("ERRROR");
    }
}

async function signIn(req, res) {
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email});

        if (user){
            if (password === req.body.password){
                res.cookie('userId', user._id, {maxAge : '600000'}) 
                res.status(200).send(user);
            }
            else
                res.status(401).send("invalid password :( ");

        }
        else{
            res.status(404).send("user Not Found");
        }
    }
    catch(error){
        console.log(error);
        res.send(error);
    }
}

module.exports = {signUp, signIn};
