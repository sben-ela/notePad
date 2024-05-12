const express = require('express');
const {addNote, getNotes} = require('./note.controller');


const router = new express.Router();


router.use((req, res, next) => {
    console.log(req.method);
    if (req.method === 'POST')
        res.status(403).send("Not authorazited")
    next()
  })
router.post('/add-note', addNote);


router.get('/get-notes/:id', getNotes);


module.exports = router;