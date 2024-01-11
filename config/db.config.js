'use strict';
require('dotenv').config();

exports.config = {
  dialect: process.env.DB_CONNECTION || 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || '3306',
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '123456',
  database: process.env.DB_DATABASE || 'users'
};