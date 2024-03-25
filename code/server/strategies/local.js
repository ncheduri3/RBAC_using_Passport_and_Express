const localStrategy = require('passport-local');
const passport = require('passport');
const validatePassword = require('../utils/passwordUtil').validatePassword;

const db = require("../models");
const User = db.user;

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser(async (user, done) => {
    done (null, user);
    // try {
        // const auth_user = await User.findOne({where: {username: user.username}});
        // if (auth_user == undefined || auth_user == null) {
        //     done(null, false);
        // } else {
        //     console.log(auth_user);
        //     done(null, auth_user);
        // }
    // } catch (err) {
    //     done(err, false);
    // }
});

passport.use(new localStrategy({ passReqToCallback: true},
    async (req, username, password, done) => {
        try {
            const user = await User.findOne({where: {username: username}});
            if (user == undefined || user == null) {
                console.log("User not found")
                done(null, false);
            } else {
                console.log("User found.")
                if (validatePassword(password, user.hash, user.salt)) {
                    user.last_login = Date.now();
                    console.log("User is successfully authenticated.")
                    done(null, user);
                } else {
                    console.log('Bad Credentials. Incorrect Password.');
                    done(null, false);
                }

            }
        } catch (err) {
            done(err, false);
        }
    }
));