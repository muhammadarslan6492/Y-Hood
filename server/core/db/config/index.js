const path = require('path');
require('dotenv').config();
const url = require('url');
const DATABASE_URL = `postgres://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}/${process.env.DATABASE_NAME}`;

const dbUrl = url.parse(DATABASE_URL);
const dbUser = dbUrl.auth.substr(0, dbUrl.auth.indexOf(':'));
const dbPassword = dbUrl.auth.substr(dbUrl.auth.indexOf(':') + 1, dbUrl.auth.length);
const dbHost = dbUrl.hostname;
const dbName = dbUrl.path.slice(1);
const dbScheme = dbUrl.protocol.substr(0, dbUrl.protocol.length - 1);
const dbPort = dbUrl.port;
module.exports = {
  development: {
    username: dbUser,
    password: dbPassword,
    database: dbName,
    host: dbHost,
    dialect: dbScheme,
    port: dbPort,
    seederStorage: 'sequelize',
  },
};
