require('dotenv').config();

module.exports = {
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
  TOKEN_EXPIRY: '7d',
  REFRESH_TOKEN_EXPIRY: '7d'
};

