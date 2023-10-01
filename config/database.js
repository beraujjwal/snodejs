'use strict';
require( 'dotenv' ).config();
module.exports = {
  'development': {
      'username': process.env.DB_USERNAME,
      'password': process.env.DB_PASSWORD,
      'database': process.env.DB_DATABASE,
      'host': process.env.DB_HOST,
      'port': parseInt(process.env.DB_PORT),
      'dialect': process.env.DB_CONNECTION,
    },
    'test': {
      'username': process.env.DB_USERNAME,
      'password': process.env.DB_PASSWORD,
      'database': process.env.DB_DATABASE,
      'host': process.env.DB_HOST,
      'port': parseInt(process.env.DB_PORT),
      'dialect': process.env.DB_CONNECTION,
    },
    'production': {
      'username': process.env.DB_USERNAME,
      'password': process.env.DB_PASSWORD,
      'database': process.env.DB_DATABASE,
      'host': process.env.DB_HOST,
      'port': parseInt(process.env.DB_PORT),
      'dialect': process.env.DB_CONNECTION,
    }
}