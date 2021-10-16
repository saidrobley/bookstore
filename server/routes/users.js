const express = require('express');
const router = express.Router();
const db = require('../db');
const { nanoid } = require('nanoid');

router.get('/', async (req, res) => {
  try {
    const results = await db.query('SELECT * FROM users');
    //console.log(results);
    res.status(200).json({
      users: results.rows,
    });
  } catch (err) {
    console.log(err);
  }
});

// create user
router.post('/', async (req, res) => {
  try {
    console.log(req.body);
    const results = await db.query(
      'INSERT INTO users (id, username, password, address, full_name) values($1, $2, $3, $4, $5) returning *',
      [
        req.body.id,
        req.body.username,
        req.body.password,
        req.body.address,
        req.body.full_name,
      ]
    );
    res.status(201).json({
      users: results.rows[0],
    });
  } catch (err) {
    console.log(err);
  }
});

// Update a user
router.put('/:id', async (req, res) => {
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
