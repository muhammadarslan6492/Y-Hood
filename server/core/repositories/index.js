/* eslint-disable prefer-destructuring */
/* eslint-disable no-shadow */
class Repository {
  constructor(modelInstance) {
    this.modelInstance = modelInstance;
  }

  findRecord(where = {}, attributes, options = {}) {
    let params = { where };
    if (attributes) {
      params.attributes = attributes;
    }
    if (options) {
      params = { ...params, ...options };
    }
    return this.modelInstance.findOne(params);
  }

  findAllRecords(where = {}, attributes, include, options = {}, plain = false) {
    let params = { where };
    if (attributes) {
      params.attributes = attributes;
    }
    if (include) {
      params.include = include;
    }
    if (options) {
      params = { ...params, ...options };
    }
    const instance = this.modelInstance.findAll(params);
    return plain ? instance.map(el => el.get({ plain: true })) : instance;
  }

  updateRecord(where = {}, values, options = {}) {
    return new Promise((resolve, reject) => {
      const params = {
        where,
        returning: true,
        ...options,
      };
      this.modelInstance
        .update(values, params)
        .then(value => {
          let returnValues = null;
          if (value[0]) {
            // eslint-disable-next-line prefer-destructuring
            returnValues = value[1][0];
          }
          resolve(returnValues);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  updateRecords(where = {}, values, options = {}) {
    return new Promise((resolve, reject) => {
      const params = {
        where,
        returning: true,
        ...options,
      };
      this.modelInstance
        .update(values, params)
        .then(value => {
          const rowsUpdated = value[0];
          const rowsValues = value[1];
          resolve({ rowsUpdated, rowsValues });
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  createRecord(values, options = {}) {
    console.log('instance', this.modelInstance);
    return this.modelInstance.create(values, options);
  }

  createOrUpdate(values, options = {}) {
    return this.modelInstance.upsert(values, options);
  }

  createBulkRecords(data, options = {}) {
    return this.modelInstance.bulkCreate(data, options);
  }

  deleteRecord(whereObject, options) {
    const params = { where: whereObject, ...options };
    return this.modelInstance.destroy(params);
  }
}

module.exports = Repository;
