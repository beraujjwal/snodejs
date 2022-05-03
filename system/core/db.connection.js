'use strict';
require( 'dotenv' ).config();
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const db = {};
const basePath = __dirname + '/../../models/';

const database = process.env.DB_DATABASE || 'node';
const user = process.env.DB_USERNAME || 'root';
const password = process.env.DB_PASSWORD || '';
const host = process.env.DB_HOST || '127.0.0.1';
const port = process.env.DB_PORT || '3306';
const dialect = process.env.DB_CONNECTION || 'mysql';
const log = process.env.APP_DEBUG || 'true';

const sequelize = new Sequelize(database, user, password, {
  host,
  port,
  dialect: dialect,
  logging: process.env.APP_ENV === 'production' ? false : console.log,
  logging: function (str) {
    console.log('\x1b[32m%s\x1b[0m', str);
  }
});

fs
  .readdirSync(basePath)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== 'index.js') && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(basePath, file))(sequelize, Sequelize.DataTypes);
    //console.log(model);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
