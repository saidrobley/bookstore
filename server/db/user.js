const db = require('./index');

const getAllUsers = async () => {
  const users = await db.query('SELECT * FROM users');
  return users.rows;
};

const getUserById = async (id) => {
  const user = await db.query('SELECT * FROM users where id = $1', [id]);
  return user.rows[0];
};

const createUser = async (user) => {
  const result = await db.query(
    'INSERT INTO users (id, username, password, address, full_name) values($1, $2, $3, $4, $5) returning *',
    [user.id, user.username, user.password, user.address, user.full_name]
  );
  return result.rows[0];
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
};
