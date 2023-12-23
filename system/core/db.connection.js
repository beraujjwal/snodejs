'use strict';
require( 'dotenv' ).config();
const { Sequelize, DataTypes } = require('sequelize');

const { config } = require('../../config/db.config');

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  port: config.port,
  dialect: config.dialect,
  operatorsAliases: 'false',
  logging: process.env.APP_ENV === 'production' ? false : console.log,
  logging: function (str) {
    log('\x1b[32m%s\x1b[0m', str);
  }
});

sequelize.authenticate().then(() => {
  log('Database Connection has been established successfully');
}).catch((ex) => {
  error(`Unable to connect to the database. - ${ex.message}`);
});

sequelize.beforeDefine(function(attributes) {
  attributes.status = {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  }
  attributes.createdBy = {
    type: DataTypes.BIGINT,
    defaultValue: null
  }
  attributes.updatedBy = {
    type: DataTypes.BIGINT,
    defaultValue: null
  }
  attributes.deletedBy = {
    type: DataTypes.BIGINT,
    defaultValue: null
  }
});

// sequelize.sync().then(() => {
//   console.log('Tables created successfully!');
// }).catch((error) => {
//   console.error('Unable to create table : ', error);
// });

module.exports = { sequelize, DataTypes };