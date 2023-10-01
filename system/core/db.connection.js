'use strict';
require( 'dotenv' ).config();

const Sequelize = require('sequelize');

const database = process.env.DB_DATABASE || 'node';
const user = process.env.DB_USERNAME || 'root';
const password = process.env.DB_PASSWORD || '';
const host = process.env.DB_HOST || '127.0.0.1';
const port = process.env.DB_PORT || '3306';
const dialect = process.env.DB_CONNECTION || 'mysql';
const log = process.env.APP_DEBUG || 'true';

const conn = {};
const sequelize = new Sequelize(database, user, password, {
    host,
    port,
    dialect,
    operatorsAliases: 'false',
    logging: process.env.APP_ENV === 'production' ? false : console.log,
    logging: function (str) {
      console.log('\x1b[32m%s\x1b[0m', str);
    }
});

conn.sequelize = sequelize;
conn.Sequelize = Sequelize;

module.exports = conn;