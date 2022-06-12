'use strict';
const User = require('../models/user');
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
// const sendWelcomeEmail = require('../helpers/sendmail');
const jwt = require('jsonwebtoken');
const  generateAuthToken = require('../helpers/jwt.helper');
class UserController {


  login(req, res) {
    return res.render('login');
  }

  listUser(req, res) {
    User.find({}, function (err, user) {
      return res.status(200).json(user);
    });
  }

  // create new cause
  createUser(req, res) {
    var newUser = new User.create(req.body);
    newUser.hash_password = bcrypt.hashSync(req.body.hash_password, salt);
    try {
       newUser.save();
      // sendWelcomeEmail('buiquangloi1993@gmail.com', newUser.username);
      newUser.hash_password = undefined;
      const token =  generateAuthToken(newUser);
      res.status(200).send({
        user: newUser, token
      });
    } catch (err) {
      res.status(400).send({
        message: err
      });
    }
  };

  editUser(req, res) {
    let token = req.body.token;
    let id = req.params.id;
    let data = req.body;
    const filter = {
      id: id,
      'tokens.token': token
    };
    data.hash_password = bcrypt.hashSync(data.hash_password, salt)
    User.updateOne(filter, { $set: data })
      .exec()
      .then(() => {
        res.status(200).json({
          success: true,
          message: 'User is updated',
          updateUser: data,
        });
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          message: 'Server error. Please try again.'
        });
      });
  }

  deleteUser(req, res) {
    let id = req.params.id;
    User.delete({
      id: id
    })
      .exec()
      .then(() => {
        res.status(200).json({
          success: true,
          message: 'User is deleted',
        });
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          message: 'Server error. Please try again.'
        });
      });
  }

  signIn(req, res) {
      User.where({ email: req.body.email }).then(user => {
        try {
          if (!user) {
            throw new Error('Unable to login')
          }
          const isMatch =  bcrypt.compare(req.body.hash_password, user[0].password);

          if (!isMatch) {
            throw new Error('Unable to login')
          }
          const token =  generateAuthToken(user);
          req.session.userId = user.id;
          return res.redirect('/');
        } catch (e) {
          return res.redirect('/login');
          // res.status(400).send(e);
        }
      });
  }

  loginRequired(req, res, next) {
    if (req.user) {
      next();
    } else {
      return res.status(401).json({ message: 'Unauthorized user!' });
    }
  };
}

module.exports = new UserController;