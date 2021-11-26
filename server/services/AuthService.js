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
      const result = await UserModelInstance.createUser(data);

      return result;
    } catch (err) {
      throw createError(500, err);
    }
  }

  async login(data) {
    const { email, password } = data;

    try {
      const user = await UserModelInstance.getUserByEmail(email);

      if (!user) {
        return 'Incorrect username or password';
      }

      const match = await bcrypt.compare(password, user.password);

      if (match) {
        return user;
      }
      return 'Incorrect username or password';
    } catch (err) {
      console.log('inside catch');

      throw err;
    }
  }
};
