const express = require('express');
const router = express.Router();
const UserService = require('../services/UserService');

const UserModel = require('../models/user');
const UserModelInstance = new UserModel();

const UserServiceInstance = new UserService();
// get all the users
router.get('/', async (req, res) => {
  try {
    const users = await UserModelInstance.getAllUsers();

    if (users) {
      res.status(200).json(users);
    }
  } catch (err) {}
});
// get user by id
router.get('/:userId', async (req, res, next) => {
  try {
    const { userId } = req.params;

    const response = await UserServiceInstance.get(userId);
    // const { email, firstname, lastname, isadmin} =
    //   response;
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
});
// delete user
router.delete('/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const userDeleted = await UserModelInstance.delete(userId);
    res.status(200).json(userDeleted);
  } catch (err) {
    console.log(err);
  }
});
// update
router.post('/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const user = req.body;

    const userUpdated = await UserModelInstance.updateAdmin(user);

    res.status(200).json(userUpdated);
  } catch (err) {
    console.log(err);
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
