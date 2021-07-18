'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Attribute extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    isUnique = function(modelName, field) {
      return function(value, next) {
        var Model = require("../models")[modelName];
        var query = {};
        query[field] = value;
        Model.find({where: query, attributes: ["id"]}).then(function(obj) {
          if (obj) {
            next(field + ' "' + value + '" is already in use');
          } else {
            next();
          }
        });
      };
    }

  };


  Attribute.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    code: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        message: 'Arrtibuite code cannot be null.',
        fields: [sequelize.fn('lower', sequelize.col('code'))]
      },
      unique: {
        args: true,
        message: 'Arrtibuite code must be unique.',
        fields: [sequelize.fn('lower', sequelize.col('code'))]
      },
      validate: {
          is: {
              args: ["^[a-z0-9-_]+$",'i'], // must start with letter and only have letters, numbers, dashes
              msg: 'Arrtibuite code must start with a letter, have no spaces, and be 3 - 40 characters.'
          }
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        message: 'Arrtibuite name cannot be null.',
        //fields: [sequelize.fn('lower', sequelize.col('name'))]
      }
    },
    type: DataTypes.STRING,
    validation: DataTypes.STRING,
    position: DataTypes.INTEGER,
    is_required: DataTypes.BOOLEAN,
    is_unique: DataTypes.BOOLEAN,
    is_filterable: DataTypes.BOOLEAN,
    is_configurable: DataTypes.BOOLEAN,
    is_visible: DataTypes.BOOLEAN,
    is_user_defined: DataTypes.BOOLEAN,
    is_comparable: DataTypes.BOOLEAN,
    deleted_at: DataTypes.DATE,
    status: DataTypes.BOOLEAN,
    regx: DataTypes.STRING,
    created_by: DataTypes.INTEGER,
  }, {
    hooks: {
      beforeValidate: function (model, options) {
        if (typeof model.name === 'string') {
          model.code = model.name.toLowerCase();
          model.code = model.code.replace(/[^a-zA-Z-_ ]/g, "");
          model.code = model.code.replace(/[^a-zA-Z]/g, "-");
        }
      }
    },
    defaultScope: {
      where: {
        deleted_at: null
      }
    },
    scopes: {
      selectBox: {
        where: {
          type: 'select'
        }
      }
    },
    sequelize,
    modelName: 'Attribute',
    tableName: 'attributes',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  
  return Attribute;
};
