'use strict';
require('dotenv').config();

const Umzug = require("umzug");
const models = require("../model");
const { sequelize } = require('../db.connection');

const seedsConfig = {
  storage: "sequelize",
  storageOptions: {
    sequelize: sequelize,
    modelName: 'SequelizeData' // Or whatever you want to name the seeder storage table
  },
  migrations: {
    params: [
      sequelize.getQueryInterface(),
      sequelize.constructor
    ],
    path: "./database/seeders", // path to folder containing seeds
    pattern: /\.js$/
  }
};

const seeder = new Umzug(seedsConfig);
module.exports = { seeder };;
