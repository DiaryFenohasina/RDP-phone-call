require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const http = require('http');
const initSocket = require('../utils/socket')
const { startCron } = require('../controllers/CallController');
const callRoutes = require('../routes/CallRoutes')

const app = express();
const server = http.createServer(app);
const io = initSocket(server);

app.set('io', io);
startCron(app);
app.use('/api', callRoutes)
app.use(morgan('dev'))
app.use(express.json());
app.use(cors());

module.exports = server;
