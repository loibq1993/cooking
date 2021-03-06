const jwt = require('jsonwebtoken')
const User = require('../models/user');
const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace("Bearer ", '');
        const decoded = jwt.verify(token, 'demoapp');
        const user = await User.find({id: decoded.id, 'rememberToken': token})
        if (!user) {
            throw new Error()
        }

        req.user = user;
        next();
    } catch (e) {
        res.status(401).send({
            errors: 'User or password not match'
        })
    }
}

module.exports = auth;