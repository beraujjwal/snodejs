'use strict';
const { sequelize, DataTypes } = require('../system/core/db.connection');
const User = require('./user.model');

const MODEL_SINGULAR_FORM = sequelize.define("MODEL_SINGULAR_FORM",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      /**
       * Add you fields here
       */
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        comment: 'This column is for checking if the entity is active or not.'
      },
    },
    {
      timestamps: true,
      paranoid: true,
      sequelize,
      modelName: 'MODEL_SINGULAR_FORM',
      tableName: 'MODEL_PLURAL_FORM',
      defaultScope: {
        //attributes: [//default attribuites OR can add exclude also],
        // where: { //Default condition if have
        //   status: true,
        // },
        include: [
          {
            model: User,
            as: 'addedBy',
            attributes: [ 'id', 'name', 'phone', 'email', 'status' ],
            required: false,
          },
          {
            model: User,
            as: 'editedBy',
            attributes: [ 'id', 'name', 'phone', 'email', 'status' ],
            required: false,
          },
        ]
      },
    }
);

MODEL_SINGULAR_FORM.associate = function(models) {
  //Set all associate here
};

module.exports = MODEL_SINGULAR_FORM;