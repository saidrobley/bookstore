const createError = require('http-errors');
const UserModel = require('../models/user');
const bcrypt = require('bcrypt');

const UserModelInstance = new UserModel();

module.exports = class AuthService {
  async register(data) {
    const { email } = data;
    //const email = data.email.toLowerCase();
    console.log('inside auth service register', data);
    try {
      const user = await UserModelInstance.getUserByEmail(email);
      if (user) {
        throw createError(409, 'Email already in use');
      }
      //return await UserModelInstance.createUser(data);
      const result = await UserModelInstance.createUser(data);
      console.log('after await create user is done response', result);
      return result;
      //console.log('auth service regist result', result);
      //return result;
      // console.log('result inside auth service...', result);
      // const dataLogin = {
      //   email: result.email,
      //   password: result.password,
      // };
      // console.log('data,,,,', dataLogin);
      // this.login(dataLogin);
      //const result = await UserModelInstance.createUser(data);
      //console.log('auth service inside create user', result);
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
      return 'Incorrect username or password';
      //return 'Incorrect username or password';
      //throw createError(401, 'Incorrect usernameee or password');
    } catch (err) {
      console.log('inside catch');
      //throw createError(500, err);
      throw err;
    }
  }
};
