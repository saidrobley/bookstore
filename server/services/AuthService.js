const createError = require('http-errors');
const UserModel = require('../models/user');
const bcrypt = require('bcrypt');

const UserModelInstance = new UserModel();

module.exports = class AuthService {
  async register(data) {
    const { email } = data;
    try {
      const user = await UserModelInstance.getUserByEmail(email);
      if (user) {
        throw createError(409, 'Email already in use');
      }
      return await UserModelInstance.createUser(data);
    } catch (err) {
      throw createError(500, err);
    }
  }

  async login(data) {
    const { email, password } = data;

    try {
      const user = await UserModelInstance.getUserByEmail(email);

      if (!user) {
        throw createError(401, 'Incorrect username or password');
      }
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        return user;
      }
      //return 'Incorrect username or password';
      throw createError(401, 'Incorrect usernameee or password');

      // bcrypt.compare(password, user.password).then((result) => {
      //   throw createError(401, 'Incorrect usernameee or password');
      // });
      // if (user.password !== password) {
      //   throw createError(401, 'Incorrect username or password');
      // }
    } catch (err) {
      console.log('inside catch');
      //throw createError(500, err);
      throw err;
    }
  }
};
