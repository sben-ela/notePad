const express = require('express');
const {register, login, checkAuthenticated} = require('./user.controller');

const router = new express.Router();


router.post('/register', register);
router.post('/login', login);
router.get('/authenticated', checkAuthenticated);



module.exports = router;
