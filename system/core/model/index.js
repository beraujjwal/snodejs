'use strict';
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const pluralize = require('pluralize');
const changeCase = require('case');

const modelsPath = __dirname + '/../../../models/';
const basename = 'index.js';


const db = {};

fs.readdirSync(modelsPath)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    );
  })
  .forEach((file) => {
    let modelName = changeCase.pascal(pluralize.singular(file.slice(0, -8)));
    db[modelName] = require(path.join(modelsPath, file));
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
