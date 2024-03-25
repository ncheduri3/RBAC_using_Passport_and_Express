const express = require('express')
const router = express.Router()

const passport = require('passport')

router.post('/logout', (req, res, next) => {
    if(req.session.user == null) {
        console.log("user has not logged in")
        res.status(400).send("User not logged in.");
    } else{
        req.logout(function(err) {
            if (err) { 
                console.log(error);
                }
            req.session.authenticated = false;
            res.send("Logged out!");
            // res.redirect('/');
          });
        
    }       

    
});

module.exports = router