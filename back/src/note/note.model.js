const mongoose = require('mongoose')

const NoteSchema = new mongoose.Schema({
    title : {type : String, required : true, unique : true},
    content : String,
    createdAt : {type: Date, default: Date.now},
    userId : String,
})

module.exports = mongoose.model("Notes", NoteSchema);