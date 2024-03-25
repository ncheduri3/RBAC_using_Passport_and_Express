const crypto = require('crypto');

function generatePassword(password) {
    var salt = crypto.randomBytes(32).toString('hex');
    //10000 iterations and 64 byte length hash and then convert to hexadecimal string
    var pwdHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    return {
        salt: salt,
        hash: pwdHash
    } 
}

function validatePassword(password, hash, salt) {
    var newHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    return newHash === hash;
}

module.exports.validatePassword = validatePassword;
module.exports.generatePassword = generatePassword;