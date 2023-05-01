import { Model, DataTypes } from 'sequelize';

export default class BaseModel extends Model {
  static init(attributes, options) {
    const newAttributes = {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      ...attributes,
    };
    return super.init.call(this, newAttributes, {
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      freezeTableName: true,
      sequelize: options.sequelize,
      ...options,
    });
  }

  static async findAllRecords(where, attributes, include, options, plain) {
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
    const instance = await this.findAll(params);
    return plain ? instance.map(el => el.get({ plain: true })) : instance;
  }

  static async findRecord(where, attributes, include, options) {
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
    return this.findOne(params);
  }

  static async findAndCount(where, attributes, include, options) {
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
    return this.findAndCountAll(params);
  }

  static async updateRecord(values, options) {
    return new Promise((resolve, reject) => {
      const params = {
        returning: true,
        ...options,
      };
      this.update(values, params)
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

  static async updateRecords(values, options) {
    return new Promise((resolve, reject) => {
      const params = {
        returning: true,
        ...options,
      };
      this.update(values, params)
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
}
