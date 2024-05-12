const express = require("express");
const { signUp, signIn } = require("./user.controller")

const router = new express.Router();


router.post('/sign-up', signUp);
router.post('/sign-in', signIn);



module.exports = router;