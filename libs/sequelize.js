// require('dotenv').config(); // ¡primera línea!
// const { config } = require('./../config/config');
// const { Sequelize } = require('sequelize');
// const setupModels = require('../db/models');

// const USER = encodeURIComponent(process.env.DB_USER);
// const PASSWORD = encodeURIComponent(process.env.DB_PASSWORD);
// const HOST = process.env.DB_HOST;
// const PORT = process.env.DB_PORT;
// const DB = process.env.DB_NAME;

// const DATABASE_URL = `postgres://${USER}:${PASSWORD}@${HOST}:${PORT}/${DB}`;
// const options = {
//   dialect: 'postgres',
//   logging: config.isProd ? false : true,
// };
// if (config.isProd) {
//   options.dialectOptions = {
//     ssl: {
//       rejectUnauthorized: false,
//     },
//   };
// }
// const sequelize = new Sequelize(DATABASE_URL, options);
// setupModels(sequelize);

// module.exports = sequelize;
require('dotenv').config();

const { Sequelize } = require('sequelize');
const setupModels = require('../db/models');

const isProd = process.env.NODE_ENV === 'production';

const DATABASE_URL = isProd
  ? process.env.DATABASE_URL
  : `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

const options = {
  dialect: 'postgres',
  logging: isProd ? false : console.log,
};

if (isProd) {
  options.dialectOptions = {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  };
}

const sequelize = new Sequelize(DATABASE_URL, options);

setupModels(sequelize);

module.exports = sequelize;
