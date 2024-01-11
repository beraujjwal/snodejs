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
  // logging: function (str) {
  //   log('\x1b[32m%s\x1b[0m', str);
  // }
});


sequelize.authenticate().then(() => {
  log('Database Connection has been established successfully');
}).catch((ex) => {
  error(`Unable to connect to the database. - ${ex.message}`);
});

sequelize.beforeDefine(function(attributes, model) {

  if((model?.name?.plural != 'SequelizeMeta') && (model?.name?.plural != 'SequelizeData') && (model?.name?.plural != 'Tokens')) {
    attributes.status = {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
    attributes.createdBy = {
      type: DataTypes.BIGINT,
      references: {
        model: 'User',
        key: 'id',
      },
      defaultValue: 0
    }
    attributes.updatedBy = {
      type: DataTypes.BIGINT,
      references: {
        model: 'User',
        key: 'id',
      },
      defaultValue: 0
    }
    attributes.deletedBy = {
      type: DataTypes.BIGINT,
      references: {
        model: 'User',
        key: 'id',
      },
      defaultValue: 0
    }
  }

});


sequelize.beforeCreate(function(attributes) {
  console.log('1 beforeCreate currentLoginUserId', currentLoginUserId);
  attributes.createdBy = currentLoginUserId || null;
});

sequelize.beforeSave(function(attributes) {
  console.log('2 beforeSave currentLoginUserId', currentLoginUserId);
  attributes.createdBy = currentLoginUserId || null;
});

sequelize.beforeUpdate(function(attributes) {
  console.log('3 beforeUpdate currentLoginUserId', currentLoginUserId);
  attributes.updatedBy = currentLoginUserId || null;
});

sequelize.beforeUpsert(function(attributes) {
  console.log('4 beforeUpsert currentLoginUserId', currentLoginUserId);
  attributes.updatedBy = currentLoginUserId || null;
});

sequelize.beforeDestroy(function(attributes) {
  console.log('5 beforeDestroy currentLoginUserId', currentLoginUserId);
  attributes.deletedBy = currentLoginUserId || null;
});

sequelize.sync().then(() => {
  console.log('Sequelize synced successfully!');
}).catch((ex) => {
  error(`Unable to create table : ${ex.message}`);
});

module.exports = { sequelize, DataTypes };