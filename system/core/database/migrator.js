'use strict';
const Umzug = require('umzug');
const models = require("../model");
const { sequelize } = require('../db.connection');

const migrationsConfig = {
  storage: "sequelize",
  storageOptions: {
    sequelize: sequelize
    // modelName: 'SequelizeMeta' // No need to specify, because this is default behaviour
  },
  migrations: {
    params: [
      sequelize.getQueryInterface(),
      sequelize.constructor
    ],
    path: "./database/migrations", // path to folder containing migrations
    pattern: /\.js$/,
    // context: sequelize.getQueryInterface(),
    logger: console,
  }
};

const migrator = new Umzug(migrationsConfig);
module.exports = { migrator };