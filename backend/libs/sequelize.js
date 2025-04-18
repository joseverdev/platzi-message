const { Sequelize } = require('sequelize');
const config = require('../config/config.js');
const setupModels = require('../db/models/index.js');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const sequelize = new Sequelize(URI, {
  dialect: 'postgres',
  logging: false,
  ssl: true,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});

setupModels(sequelize);

module.exports = { sequelize };
