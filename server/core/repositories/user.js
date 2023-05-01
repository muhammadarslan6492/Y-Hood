import models from '../db/models/index';
import Repository from './index';

class UserRepo extends Repository {
  // eslint-disable-next-line no-useless-constructor
  constructor(user) {
    super(user);
  }

  /**
   * @name fetchUser
   * @desc fetch user
   * @param {*} params
   * @param {*} options
   * @return {Promise} User
   */
  async fetchUser(params, options = {}) {
    const attributes = [
      'id',
      'email',
      'password',
      'salt',
      'name',
      'dob',
      'updatedAt',
      'createdAt',
      'gender',
    ];
    return this.findRecord(params, attributes, options);
  }

  /**
   * @name createUser
   * @desc create User
   * @param {*} User
   * @param {*} options
   * @return {Promise}
   */
  async createUser({ email, name, dob, password, gender }, options = {}) {
    const payload = {
      email,
      name,
      dob,
      password,
      gender,
    };
    return this.createRecord(payload, options);
  }

  /**
   * @name updateUser
   * @desc update User
   * @param {*} User
   * @return {Promise}
   */
  updateUser(where, values, options) {
    return this.updateRecord(where, values, options);
  }
}

module.exports = new UserRepo(models.user);
