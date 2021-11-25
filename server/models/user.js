const db = require('../db/index');
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = class UserModel {
  // create a new user record.
  async createUser(user) {
    console.log('inside create user');
    try {
      const hashPassword = await bcrypt.hash(user.password, saltRounds);
      const result = await db.query(
        `INSERT INTO users 
                (email, password, firstName, lastName) 
                values($1, $2, $3, $4) returning *`,
        [user.email.toLowerCase(), hashPassword, user.firstName, user.lastName]
      );

      if (result.rows?.length) {
        console.log('after create user ', result.rows[0]);
        return result.rows[0];
      }
    } catch (err) {
      throw new Error(err);
    }
  }
  // update admin
  async updateAdmin(user) {
    console.log('inside admin', user);
    try {
      const updatedUser = await db.query(
        'UPDATE users SET isadmin=$1 where id=$2 returning *',
        [user.isadmin, user.id]
      );
      if (updatedUser.rows?.length) {
        return updatedUser.rows[0];
      }
    } catch (err) {
      console.log(err);
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
      console.log('user model email: ', email);
      console.log('type of email: ', typeof email);

      const user = await db.query(`SELECT * FROM users where email=$1`, [
        email.toLowerCase(),
      ]);
      if (user.rows?.length) {
        console.log('inside user mode after select stm', user.rows[0]);
        return user.rows[0];
      }
      return null;
    } catch (err) {
      throw new Error(err);
    }
  }
  // get all users
  async getAllUsers() {
    try {
      const user = await db.query('SELECT * FROM users');
      if (user.rows?.length) {
        return user.rows;
      }
    } catch (err) {
      console.log(err);
    }
  }
};
