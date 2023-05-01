import { Sequelize } from 'sequelize';

const uri = `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_ENDPOINT}/${process.env.DB_NAME}`;
const connectSequelize = () => new Sequelize(uri);
export { connectSequelize, Sequelize };
