import models from '../db/models';
import Repository from './index';

class AuthenticationTokenRepo extends Repository {
  // eslint-disable-next-line no-useless-constructor
  constructor(model) {
    super(model);
  }

  /**
   * @name fetchToken
   * @desc fetch token
   * @param {*} params
   * @return {Promise} User
   */
  fetchToken(params) {
    return this.findRecord(params);
  }

  /**
   * @name upsertAuthenticationToken
   * @desc upsert authentication token
   * @param {object} values
   * @return {Promise}
   */
  upsertAuthenticationToken(values, options = {}) {
    return this.createOrUpdate(values, options);
  }

  /**
   * @name removeToken
   * @desc delete token
   * @param {object} where
   * @return {Promise}
   */
  removeToken(where) {
    return this.deleteRecord(where);
  }

  /**
   * @name createAuthenticationToken
   * @desc create authentication token
   * @param {*} payload // AuthenticationToken
   * @param {*} options
   * @return {Promise}
   */
  async createAuthenticationToken(payload, options = {}) {
    return this.createRecord(payload, options);
  }
}

module.exports = new AuthenticationTokenRepo(models.authenticationToken);
