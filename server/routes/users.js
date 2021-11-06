const express = require('express');
const router = express.Router();
const UserService = require('../services/UserService');

const UserServiceInstance = new UserService();

// get user by id
router.get('/:userId', async (req, res, next) => {
  try {
    const { userId } = req.params;
    const response = await UserServiceInstance.get({ id: userId });
    const { email, firstname, lastname, address1, address2, date_joined } =
      response;
    res
      .status(200)
      .json({ email, firstname, lastname, address1, address2, date_joined });
  } catch (err) {
    next(err);
  }
});

// create a new user
// router.post('/', async (req, res, next) => {
//   const { id, username, password, address, full_name } = req.body;
//   try {
//     const newUser = await UserServiceInstance.create(req.body);
//     res.status(200).json({ user: newUser });
//   } catch (err) {
//     next(err);
//   }
// });

module.exports = router;
