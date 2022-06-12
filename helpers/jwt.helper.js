const jwt = require('jsonwebtoken');
const User =  require('../models/user');
const generateAuthToken = (user) => {
    const rememberToken = jwt.sign({id: user.id}, 'demoapp')
    User.updateOne({ id:user.id }, { rememberToken: rememberToken })
    return rememberToken;
}

module.exports = generateAuthToken;