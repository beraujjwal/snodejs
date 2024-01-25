'use strict';
require( 'dotenv' ).config();
const { Sequelize, DataTypes } = require('sequelize');

const { config } = require('../../config/db.config');

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  port: config.port,
  dialect: config.dialect,
  operatorsAliases: 'false',
  logging: config.logging ? console.log : false,
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
      defaultValue: null
    }
    attributes.updatedBy = {
      type: DataTypes.BIGINT,
      references: {
        model: 'User',
        key: 'id',
      },
      defaultValue: null
    }
    attributes.deletedBy = {
      type: DataTypes.BIGINT,
      references: {
        model: 'User',
        key: 'id',
      },
      defaultValue: null
    }
    attributes.version = {
      type: DataTypes.BIGINT,
      defaultValue: 1
    }
  }

});


sequelize.beforeCreate(async (attributes, options) => {
  console.log('global.currentLoginUserId', global.currentLoginUserId);
  attributes.createdBy = global.currentLoginUserId || null;
});

sequelize.beforeSave(async (attributes, options) => {
  attributes.createdBy = global.currentLoginUserId || null;
});

sequelize.beforeUpdate(async (attributes, options) => {
  attributes.updatedBy = global.currentLoginUserId || null;
});

sequelize.beforeUpsert(async (attributes, options) => {
  attributes.updatedBy = global.currentLoginUserId || null;
});

sequelize.beforeDestroy(async (attributes, options) => {
  attributes.deletedBy = global.currentLoginUserId || null;
});

if(config.sync) {
  sequelize.sync().then(() => {
    console.log('DB & Model synced successfully!');
  }).catch((ex) => {
    error(`Unable to create table : ${ex.message}`);
  });
}

module.exports = { sequelize, DataTypes };