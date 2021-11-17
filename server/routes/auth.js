const express = require('express');
const passport = require('passport');
const router = express.Router();
const userModel = require('../models/user');
const userModelInstance = new userModel();

// Instantiate Services
const AuthService = require('../services/AuthService');
const AuthServiceInstance = new AuthService();

// /auth/register
router.post('/register', async (req, res, next) => {
  try {
    const data = req.body;
    const response = await AuthServiceInstance.register(data);
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
});

router.post(
  '/login',
  passport.authenticate('local'),
  async (req, res, next) => {
    try {
      const { username, password } = req.body;

      const response = await AuthServiceInstance.login({
        email: username,
        password: password,
      });

      const { id, email, firstname, lastname } = response;
      if (id && email && firstname && lastname) {
        res.status(200).json({ id, email, firstname, lastname });
      } else {
        res.send({ err: response });
      }
    } catch (err) {
      next(err);
    }
  }
);

const checkAuthentication = async (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.send('user is not authorized');
  }
};

router.get('/logout', async (req, res) => {
  req.logout();

  res.status(200).json({ message: 'user successfully logout!' });
});

router.get('/secret', checkAuthentication, async (req, res) => {
  if (req.user) {
    const user = await userModelInstance.getUserById(req.user.id.id);
    res.send(user);
  } else {
    console.log('err inside secret');
  }
});

module.exports = router;
