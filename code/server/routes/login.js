const express = require('express')
const router = express.Router()

const passport = require('passport')
const generatePassword = require('../utils/passwordUtil').generatePassword;

// process get request on /
router.post('/login', passport.authenticate('local'), (req,res) => {
    console.log(req.sessionID);
    const { username, password } = req.body;
    const { salt, hash } = generatePassword(password);
    req.session.authenticated = true;
    req.session.user = { username, hash, salt};
    res.json(req.session);
});

module.exports = router