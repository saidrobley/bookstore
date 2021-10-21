const express = require('express');
const passport = require('passport');
const router = express.Router();

// Instantiate Services
const AuthService = require('../services/AuthService');
const AuthServiceInstance = new AuthService();

// /auth/register
router.post('/register', async (req, res, next) => {
  try {
    const data = req.body;
    const response = await AuthServiceInstance.register(data);
    res.status(200).json({
      user: data,
    });
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
      const { email, firstname, lastname } = response;
      res.status(200).json({ user: { email, firstname, lastname } });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
