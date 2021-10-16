const express = require('express');
const router = express.Router();
const db = require('../db');
const { nanoid } = require('nanoid');
const { getAllUsers, getUserById, createUser } = require('../db/user');

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
  try {
    const results = await db.query(
      'UPDATE users SET username = $1, password = $2, address = $3, full_name = $4 where id = $5 returning *',
      [
        req.body.username,
        req.body.password,
        req.body.address,
        req.body.full_name,
        req.body.id,
      ]
    );
    res.status(200).json({
      user: results.rows[0],
    });
  } catch (err) {
    console.log(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const results = await db.query('DELETE FROM users where id = $1', [
      req.params.id,
    ]);
    res.status(204).json({
      status: 'success',
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
