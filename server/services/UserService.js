const UserModel = require('../models/user');
const createError = require('http-errors');
const UserModelInstance = new UserModel();

module.exports = class UserService {
  async get(data) {
    const { id } = data;
    try {
      const user = await UserModelInstance.getUserById(id);
      // if user doesn't exist, reject
      if (!user) {
        //throw createError(404, 'User record not found');
        return { err: 'User record not found' };
      }
      return user;
    } catch (err) {
      throw err;
    }
  }
  async update(data) {
    const { id } = data;
    try {
      const user = UserModelInstance.getUserById(id);
      if (user) {
        const updatedUser = await UserModelInstance.updateUser(user);
        return updatedUser;
      } else {
        throw createError(404, 'User can not be updated!!');
      }
    } catch (err) {
      throw err;
    }
  }
  async create(data) {
    const { id } = data;

    try {
      const user = await UserModelInstance.getUserById(id);
      if (user) {
        throw createError(404, 'cannot create the user');
      } else {
        const createdUser = UserModelInstance.createUser(data);
        return createdUser;
      }
    } catch (err) {
      throw err;
    }
  }
};
