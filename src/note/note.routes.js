const express = require('express');
const {addNote, getNotes} = require('./note.controller');


const router = new express.Router();



router.post('/add-note', addNote);
router.get('/get-notes/:id', getNotes);

module.exports = router;