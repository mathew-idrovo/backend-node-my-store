// const { Sequelize } = require('sequelize');

// const { config } = require('./../config/config');
// const setupModels = require('../db/models');

// const USER = encodeURIComponent(config.dbUser);
// const PASSWORD = encodeURIComponent(config.dbPassword);
// const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

// const sequelize = new Sequelize(URI, {
//   dialect: 'postgres',
//   logging: false,
// });
// setupModels(sequelize);
// console.log('[SEQUELIZE] Connection to DB established', USER, URI);

// module.exports = sequelize;

require('dotenv').config(); // ¡primera línea!

const { Sequelize } = require('sequelize');
const setupModels = require('../db/models');

const USER = encodeURIComponent(process.env.DB_USER);
const PASSWORD = encodeURIComponent(process.env.DB_PASSWORD);
const HOST = process.env.DB_HOST;
const PORT = process.env.DB_PORT;
const DB = process.env.DB_NAME;

const URI = `postgres://${USER}:${PASSWORD}@${HOST}:${PORT}/${DB}`;

const sequelize = new Sequelize(URI, { dialect: 'postgres', logging: false });
setupModels(sequelize);

module.exports = sequelize;
