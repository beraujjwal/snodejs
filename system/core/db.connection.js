"use strict";
require("dotenv").config();
const { Sequelize, DataTypes } = require("sequelize");

const { config } = require("../../config/db.config");

const acquireAttempts = new WeakMap();

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    port: config.port,
    dialect: config.dialect,
    operatorsAliases: "false",
    logging: config.logging ? console.log : false,
    // logging: function (str) {
    //   log('\x1b[32m%s\x1b[0m', str);
    // }
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

sequelize
  .authenticate()
  .then(() => {
    log("Database Connection has been established successfully");
  })
  .catch((ex) => {
    error(`Unable to connect to the database. - ${ex.message}`);
  });

sequelize.beforeDefine(function (attributes, model) {
  if (model?.footprints) {
    attributes.createdBy = {
      type: DataTypes.BIGINT.UNSIGNED,
      references: {
        model: {
          tableName: "users",
          modelName: "User",
        },
        key: "id",
      },
      defaultValue: null,
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    };
    attributes.updatedBy = {
      type: DataTypes.BIGINT.UNSIGNED,
      references: {
        model: {
          tableName: "users",
          modelName: "User",
        },
        key: "id",
      },
      defaultValue: null,
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    };
    if (model?.paranoid) {
      attributes.deletedBy = {
        type: DataTypes.BIGINT.UNSIGNED,
        references: {
          model: {
            tableName: "users",
            modelName: "User",
          },
          key: "id",
        },
        defaultValue: null,
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      };
    }
  }
});

sequelize.beforeCreate(async (attributes, options) => {
  console.log("global.currentLoginUserId", global.currentLoginUserId);
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

if (config.sync) {
  sequelize
    .sync()
    .then(() => {
      console.log("DB & Model synced successfully!");
      return true;
    })
    .catch((ex) => {
      error(`Unable to create table : ${ex.message}`);
    });
}

// sequelize.hooks.addListener("beforePoolAcquire", (options) => {
//   acquireAttempts.set(options, Date.now());
// });

// sequelize.hooks.addListener("afterPoolAcquire", _connection, (options) => {
//   const elapsedTime = Date.now() - acquireAttempts.get(options);
//   console.log(`Connection acquired in ${elapsedTime}ms`);
// });

module.exports = { sequelize, DataTypes };
