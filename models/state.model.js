'use strict';
const { sequelize, DataTypes } = require('../system/core/db.connection');
const User = require('./user.model');

const State = sequelize.define("State",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        required : true,
        index : true,
        allowNull: false
      },
      countryID: {
        type: DataTypes.BIGINT,
        required : true,
        index : true,
        references: {
          model: 'Country',
          key: 'id',
        }
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        comment: 'This column is for checking if the state is active or not.'
      },
    },
    {
      timestamps: true,
      paranoid: true,
      sequelize,
      modelName: 'State',
      tableName: 'states',
      defaultScope: {
        attributes: { exclude: [ 'deletedAt', 'deletedBy', 'createdBy','updatedBy' ] },
        where: {
          status: true,
        },
        include: [
          {
            model: User,
            as: 'createdByUser',
            attributes: [ 'id', 'name', 'phone', 'email', 'status' ],
            required: false,
          },
          {
            model: User,
            as: 'updatedByUser',
            attributes: [ 'id', 'name', 'phone', 'email', 'status' ],
            required: false,
          },
        ]
      },
      scopes: {
        activeCountries: {
          where: {
            status: true
          }
        }
      },

    }
);

State.associate = function(models) {
  State.belongsTo(models.Country, {foreignKey: 'countryID', as: 'country'});
  State.hasMany(models.City, {foreignKey: 'stateID', as: 'cities'});

  State.belongsTo(models.User, { as: 'createdByUser', foreignKey: 'createdBy'});
  State.belongsTo(models.User, {as: 'updatedByUser', foreignKey: 'updatedBy'});
};

module.exports = State;