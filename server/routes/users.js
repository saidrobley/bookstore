const express = require('express');
const router = express.Router();
const db = require('../db');
const { nanoid } = require('nanoid');
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require('../db/user');

// get all users
router.get('/', async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).json({
      users: users,
    });
  } catch (err) {
    console.log(err);
  }
});

// get one user
router.get('/:userId', async (req, res) => {
  try {
    const user = await getUserById(req.params.userId);
    console.log('userId', user);
    res.status(200).json({
      user: user,
    });
  } catch (err) {
    console.log(err);
  }
});

// create user
router.post('/', async (req, res) => {
  try {
    const user = createUser({ ...req.body });
    res.status(200).json({
      user: { ...req.body },
    });
  } catch (err) {
    console.log(err);
  }
});

// Update a user
router.put('/:userId', async (req, res) => {
  if (req.body.id !== parseInt(req.params.userId)) {
    res.status(400).json({
      err: 'id mismatch',
    });
    return;
  }
  try {
    const user = await getUserById(req.params.userId);
    const newUser = await updateUser({
      id: parseInt(req.params.userId),
      ...req.body,
    });
    res.status(200).json(newUser);
  } catch (err) {
    console.log(err);
  }
});

router.delete('/:userId', async (req, res) => {
  try {
    const user = await getUserById(req.params.userId);
    if (!user) {
      res.status(400).json({
        err: 'No user found',
      });
      return;
    }
    await deleteUser(user);
    res.status(204).json({
      status: 'success',
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
