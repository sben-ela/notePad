const express = require('express');
const jwt = require('jsonwebtoken');
const {addNote, getNotes, deleteNote, deleteAllNotes} = require('./note.controller');
require('dotenv').config();
const router = new express.Router();

router.use((req, res, next) => {
    try{
      jwt.verify(req.cookies.token, process.env.JWT_SECRET_KEY);
      next();
    }
    catch(error){
      res.status(403).send(error.message);
    }
  })



router.post('/add-note', addNote);
router.delete('/delete-note', deleteNote);
router.get('/get-notes', getNotes);
router.delete('/delete-allnotes', deleteAllNotes);


module.exports = router;