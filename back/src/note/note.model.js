const mongoose = require('mongoose')

const NoteSchema = new mongoose.Schema({
    title : String,
    content : String,
    createdAt : {type: Date, default: Date.now},
    userId : String,
})

module.exports = mongoose.model("Notes", NoteSchema);