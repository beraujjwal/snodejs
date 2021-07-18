'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RoleTranslation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  RoleTranslation.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    role_id: {
          type: DataTypes.INTEGER,
          references: 'roles', // <<< Note, its table's name, not object name
          referencesKey: 'id', // <<< Note, its a column name
          allowNull: false
    },
    lang: DataTypes.STRING,
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'RoleTranslation',
    tableName: 'role_translations',
    timestamps: false,
    underscored: true
  });
  RoleTranslation.associate = function(models) {
    RoleTranslation.belongsTo(models.Role, {as: 'translations', foreignKey: 'role_id'})
  };
  return RoleTranslation;
};
