const config  =  require('./../config/config.js');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;


module.exports = {
  development: {
    url: URI,
    dialect: 'postgres',
    dialectOptions: {
      ssl: false,
    }
  },
  production: {
    url: config.connectionString,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  },
};


