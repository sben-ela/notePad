const Note = require('./note.model')



const addNote =  async (req, res) =>{
    try{
        const note = await Note.create(req.body);
        res.status(201).send(note);

    }catch(error){

    }
}


const getNotes =  async (req, res) =>{
    try{
        const notes = await Note.find({clientId : req.params.id});
        console.log("notes : ", notes)
        
        res.status(200).send(notes);
    }catch(error){
        res.status(500).send(error);
    }
}

module.exports = {addNote, getNotes};