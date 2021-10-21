const db = require('../db/index');

module.exports = class UserModel {
  // create a new user record.
  async createUser(user) {
    try {
      const result = await db.query(
        'INSERT INTO users (email, password, firstName, lastName) values($1, $2, $3, $4) returning *',
        [user.email, user.password, user.firstName, user.lastName]
      );
      console.log('result', result.rows[0]);
      return result.rows[0];
    } catch (err) {
      throw new Error(err);
    }
  }
  // update a user
  async updateUser(user) {
    const updateUser = await db.query(
      'UPDATE users SET username = $1, password = $2, address = $3, full_name = $4 where id = $5 returning *',
      [user.username, user.password, user.address, user.full_name, user.id]
    );
    return updateUser.rows[0];
  }
  // delete a user
  async deleteUser(user) {
    try {
      const result = await db.query('DELETE FROM users where id = $1', [
        user.id,
      ]);
    } catch (err) {
      throw new Error(err);
    }
  }

  // get one user
  async getUserById(id) {
    try {
      const user = await db.query('SELECT * FROM users where id = $1', [id]);
      return user.rows[0];
    } catch (err) {
      throw new Error(err);
    }
  }
  // get user by email
  async getUserByEmail(email) {
    try {
      const user = await db.query('SELECT * FROM users where email = $1', [
        email,
      ]);
      return user.rows[0];
    } catch (err) {
      throw new Error(err);
    }
  }
};
