require('dotenv').config(); // ¡primera línea!
const { config } = require('./../config/config');
const { Sequelize } = require('sequelize');
const setupModels = require('../db/models');

const USER = encodeURIComponent(process.env.DB_USER);
const PASSWORD = encodeURIComponent(process.env.DB_PASSWORD);
const HOST = process.env.DB_HOST;
const PORT = process.env.DB_PORT;
const DB = process.env.DB_NAME;

const URI = `postgres://${USER}:${PASSWORD}@${HOST}:${PORT}/${DB}`;
const options = {
  dialect: 'postgres',
  logging: config.isProd ? false : true,
};
if (config.isProd) {
  options.dialectOptions = {
    ssl: {
      rejectUnauthorized: false,
    },
  };
}
const sequelize = new Sequelize(URI, options);
setupModels(sequelize);

module.exports = sequelize;
