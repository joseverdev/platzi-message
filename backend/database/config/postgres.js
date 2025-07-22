const { Sequelize } = require('sequelize');
const config = require('@config');
const setupModels = require('@/models/sql/index.js');

const USER = encodeURIComponent(config.database.postgres.user);
const PASSWORD = encodeURIComponent(config.database.postgres.password);
const URI = `postgres://${USER}:${PASSWORD}@${config.database.postgres.host}:${config.database.postgres.port}/${config.database.postgres.name}`;

const sequelize = new Sequelize(URI, {
  dialect: 'postgres',
  logging: false,
  ssl: true,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

setupModels(sequelize);

module.exports = { sequelize };
