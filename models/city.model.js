'use strict';
const { sequelize, DataTypes } = require('../system/core/db.connection');
const User = require('./user.model');

const City = sequelize.define("City",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING(100),
        required : true,
        index : true,
        allowNull: false,
        comment: 'This column is for name of the city.'
      },
      stateID: {
        type: DataTypes.BIGINT,
        required : true,
        index : true,
        references: {
          model: 'State',
          key: 'id',
        },
        comment: 'This column is for making relation between city and state.'
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        comment: 'This column is for checking if the city is active or not.'
      },
    },
    {
      timestamps: true,
      paranoid: true,
      sequelize,
      modelName: 'City',
      tableName: 'cities',
      defaultScope: {
        attributes: { exclude: [ 'deletedAt', 'deletedBy', 'createdBy','updatedBy' ] },
        where: {
          status: true,
        },
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
      scopes: {
        activeCities: {
          where: {
            status: true
          }
        }
      },
    }
);

City.associate = function(models) {
  City.belongsTo(models.State, {foreignKey: 'stateID', as: 'state'});

  City.belongsTo(models.User, { as: 'addedBy', foreignKey: 'createdBy'});
  City.belongsTo(models.User, {as: 'editedBy', foreignKey: 'updatedBy'});
};

module.exports = City;