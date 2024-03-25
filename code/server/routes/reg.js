const express = require('express')
const router = express.Router()

const db = require("../models");
const User = db.user;

const {check, validationResult} = require('express-validator');
const generatePassword = require('../utils/passwordUtil').generatePassword;

router.post('/reg', [ check('username')
                   .notEmpty()
                   .withMessage('Username cannot be empty')
                   .isLength({ min: 4 })
                   .withMessage('Username must be atleast 4 characters'),
                   check('password')
                   .notEmpty()
                   .withMessage('Password cannot be empty')
                   .isLength({ min: 6 })
                   .withMessage('Password must be atleast 6 characters'), ],
    async (req,res) => {
        const errors = validationResult(req);
        console.log(errors);
        if(!errors.isEmpty()) {
            return res.status(400).send({ errors: errors.array() });
        }

        console.log(req.sessionID);
        const { username, password, role_id } = req.body;
        if (username && password) {
            console.log(username, password);
            try {
                // Check if user is already registered
                const user = await User.findOne({where: {username: username}});
                console.log(user);
                if (user) {
                    res.status(401).send({
                        status: "User is already registered"
                    });
                } else {
                    const { salt, hash } = generatePassword(password); 
                    const new_user = await User.create({
                        username: username,
                        hash: hash,
                        salt: salt,
                        created_by: username,
                        role_id: role_id
                    });
                    res.status(201).send({
                        status: "success",
                        user: new_user
                    });
                }
            } catch (err) {
                console.log(err);
            }
        }
});

module.exports = router