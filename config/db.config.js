'use strict';
require('dotenv').config();

exports.config = {
  dialect: process.env.DB_CONNECTION || 'mysql',
  host: process.env.DB_HOST || 'localhost',
  post: process.env.DB_PORT || '27017',
  username: process.env.DB_USERNAME || 'root',
  passwortd: process.env.DB_PASSWORD || '123456',
  database: process.env.DB_NAME || 'users'
};

