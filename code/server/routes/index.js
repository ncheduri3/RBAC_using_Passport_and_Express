const express = require('express')
const router = express.Router()

// process get request on /
router.get('/', async (req,res) => {
    res.send('<h1>Hi! Welcome to the Home page</h1><br><a href="/dummy">Dummy</a>')
});

module.exports = router