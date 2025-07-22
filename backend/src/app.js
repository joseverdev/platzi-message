const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

require('@utils/auth'); // Importa las estrategias de autenticación

const routes = require('./routes');
const { errorHandler } = require('@middlewares/error.handler');
const config = require('@config');
const app = express();

const whiteList = [`${config.frontendUrl}`];
const options = {
  origin: (origin, callback) => {
    if (whiteList.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

// Middlewares globales
app.use(cors(options));
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Rutas
app.use('/api/v1', routes);

// Error handling
app.use(errorHandler);

module.exports = app;
