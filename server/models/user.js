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

  // console.log('inside UserMode createUser', user);
  // bcrypt.hash(user.password, saltRounds, async (err, hash) => {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     console.log('user inside model users', user);

  //     const result = await db.query(
  //       `INSERT INTO users
  //           (email, password, firstName, lastName, address1, address2)
  //           values($1, $2, $3, $4, $5, $6) returning *`,
  //       [
  //         user.email.toLowerCase(),
  //         hash,
  //         user.firstName,
  //         user.lastName,
  //         user.address1,
  //         user.address2,
  //       ]
  //     );

  //     if (result.rows?.length) {
  //       console.log('after create user ', result.rows[0]);
  //       return result.rows[0];
  //     }
  //   }
  // });

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
      const user = await db.query(
        `SELECT * FROM users where id = $1 returning *`,
        [id]
      );
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
};
