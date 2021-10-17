const db = require('./index');

// get all users
const getAllUsers = async () => {
  const users = await db.query('SELECT * FROM users');
  return users.rows;
};

// get one user
const getUserById = async (id) => {
  const user = await db.query('SELECT * FROM users where id = $1', [id]);
  return user.rows[0];
};

// create a new user
const createUser = async (user) => {
  const result = await db.query(
    'INSERT INTO users (id, username, password, address, full_name) values($1, $2, $3, $4, $5) returning *',
    [user.id, user.username, user.password, user.address, user.full_name]
  );
  return result.rows[0];
};

// update a user
const updateUser = async (user) => {
  const updateUser = await db.query(
    'UPDATE users SET username = $1, password = $2, address = $3, full_name = $4 where id = $5 returning *',
    [user.username, user.password, user.address, user.full_name, user.id]
  );
  return updateUser.rows[0];
};

// delete a user
const deleteUser = async (user) => {
  const result = await db.query('DELETE FROM users where id = $1', [user.id]);
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
