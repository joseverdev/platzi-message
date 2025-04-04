const express = require('express');
const cookieParser = require('cookie-parser');

const { Server } = require('socket.io');
const { createServer } = require('http');
const cors = require('cors');

const routes = require('./routes/routes.js');
const { checkApiKey } = require('./middlewares/auth.handler.js');

const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler.js');
const morgan = require('morgan');

const app = express();
const httpServer = createServer(app);

// Socket.IO setup with CORS
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true
  },
  transports: ['polling', 'websocket']
})

app.use(express.json({limit: '5mb'}));
app.use(express.urlencoded({ extended: true, limit: '5mb' }));
app.use(cookieParser());
app.use(morgan('dev'));

const whiteList = ['http://localhost:5173'];
const options = {
  origin: (origin, callback)=> {
    if(whiteList.includes(origin)||!origin){
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true
}

app.use(cors(options));
require('./utils/auth')

const port = process.env.PORT || 3000;

routes(app);

app.use(logErrors);
app.use(boomErrorHandler)
app.use(errorHandler);


app.get('/', (req, res) => {
  res.cookie('testCookie','the world is yous')
  res.send('Hello World!');
});

app.get('/test-auth',
  checkApiKey,
  (req, res) => {
  res.send('Don not be afraid');
});


// Initialize socket handlers
const { initializeSockets } = require('./sockets');
initializeSockets(io);

httpServer.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});
