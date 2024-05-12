const mongoose = require('mongoose');



const UserSchema = new mongoose.Schema({
    name : String,
    email : String,
    password : String,
    _id : String,
});


module.exports = mongoose.model("User", UserSchema);


