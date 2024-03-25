const express = require('express')

const router = express.Router()

router.get('/', (req,res) => {
    res.send('<h1>Hi! Welcome to the Dummy page</h1><br><a href="/">Home</a>')
});
  

module.exports = router