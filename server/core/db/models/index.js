const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const sequelizeEncPlugin = require('sequelize-enc');
const { encrypt, decrypt } = require('../encryption');

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require('../../../config/config')[env];

const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}
sequelize.addHook('beforeBulkCreate', (instances, options) => {
  const opt = options;
  opt.individualHooks = true;
});
sequelize.addHook('beforeBulkUpdate', options => {
  const opt = options;
  opt.individualHooks = true;
});
sequelizeEncPlugin(sequelize, {
  encrypt,
  decrypt,
});
fs.readdirSync(__dirname)
  .filter(
    file =>
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file !== 'base.model.js',
  )
  .forEach(file => {
    console.info('dirname is', __dirname, 'file', file);
    // eslint-disable-next-line
    const model = require(path.join(__dirname, file))(sequelize, Sequelize);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
