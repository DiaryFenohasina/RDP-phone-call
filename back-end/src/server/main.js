require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const http = require('http');
const initSocket = require('../utils/socket');
const { startCron } = require('../controllers/CallController');
const callRoutes = require('../routes/CallRoutes');

const app = express();
const server = http.createServer(app);
const io = initSocket(server);

app.set('io', io);

app.use(cors({
  origin: ['http://localhost:5173','https://rdp-phone-call.vercel.app/'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

app.use(express.json());
app.use(morgan('dev'));

app.use('/api', callRoutes);

startCron(app);

module.exports = server;
