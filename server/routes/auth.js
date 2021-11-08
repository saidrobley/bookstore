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
    console.log('inside register route', data);
    //const pswd = data.password;
    const response = await AuthServiceInstance.register(data);
    console.log('inside post register after response', response);
    //return await AuthServiceInstance.register(data);
    //console.log('inside register rout response', response);

    res.status(200).json({
      user: data,
    });
    // res.status(200).json({
    //   user: response,
    // });
  } catch (err) {
    next(err);
  }
});
// router.post('/login', (req, res) => {
//   const user = req.body;
//   console.log('inside login ', user);
// });
router.post(
  '/login',
  passport.authenticate('local'),
  async (req, res, next) => {
    try {
      const { username, password } = req.body;
      console.log('username', username);
      console.log('password', password);
      const response = await AuthServiceInstance.login({
        email: username,
        password: password,
      });
      const { email, firstname, lastname } = response;
      console.log('....', response);
      if (email && firstname && lastname) {
        res.status(200).json({ email, firstname, lastname });
      } else {
        console.log('response...', response);
        //  res.send({ response });
      }
    } catch (err) {
      console.log('error:', err.message);
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
  console.log('inside logout');
  req.logout();
  //console.log('inside');
  res.status(200).json({ message: 'user successfully logout!' });
});

router.get('/secret', checkAuthentication, async (req, res) => {
  console.log('inside secret route', req.user);
  if (req.user) {
    console.log('id...', req.user.id);
    const user = await userModelInstance.getUserById(req.user.id.id);
    res.send(user);
  } else {
    console.log('err inside secret');
  }
});

module.exports = router;
