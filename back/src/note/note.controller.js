const Note = require('./note.model')
const jwt = require('jsonwebtoken');
require('dotenv').config();

const getUserId = (token) =>{
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        return (decoded.userId);
    } catch(error){
        console.log(error.message);
    }
}

const   addNote =  async (req, res) =>{
    try{
        const note = await Note.create({...(req.body), userId : getUserId(req.cookies.token)});
        res.status(201).send(note);
    } catch(error){
        res.status(409).send({message : "invalid title"});
    }
}


const getNotes =  async (req, res) =>{
    try{
        const notes = await Note.find({userId : getUserId(req.cookies.token)});
        console.log("notes : ", notes)
        
        res.status(200).send(["fetch requests ensures that cookies and other credentials", "fetch requests ensures that cookies and other credentials"]);
    }catch(error){
        res.status(500).send(error.message);
    }
}

const deleteNote = async (req, res) =>{
    try{
        const result = await Note.deleteOne({title : req.body.title});
        res.status(201).send(`[${result}] deleted successfuly :)`)
    }
    catch(error){
        console.log(error.message);
        res.send(error.message);
    }
}


const deleteAllNotes = async (req, res) =>{
    try{
        
        const result = await Note.deleteMany({});
        res.status(201).send((`[${result.deletedCount
        }] deleted successfuly :)`));
    }
    catch(error){
        res.send(error.message)
    }
}

const getTitles = async (req, res) =>{
    try{
        const notes = await Note.find({userId : getUserId(req.cookies.token)});
        const titlesArray = notes.map(note => note.title);
        res.send(titlesArray);
    }
    catch(error){
        res.status(500).send(error.message);
    }
}

const getOneNote  = async(req, res) => {
    try{
        const note = await Note.findOne({userId : getUserId(req.cookies.token), title : req.params.title});
        console.log(note)
        res.send(note)
    }
    catch(error){
        res.send(error.message);
    }
}


const updateNote = async (req, res)=>{
    try{
        const filter = {title : req.body.title};
        const update = {...(req.body), userId : getUserId(req.cookies.token)};
        const options = {new : true};
        const note = await Note.findOneAndUpdate(filter, update, options);
        console.log(note)
        res.send(note);
    }
    catch(error){
        console.log(error.message);
    }
}

module.exports = {addNote, getNotes, deleteNote, deleteAllNotes, getTitles, getOneNote, updateNote};