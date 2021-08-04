'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Role.init({
    id: {
      type: DataTypes.INTEGER,
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
    slug: {
      type: DataTypes.STRING,
      required : true,
      index : true,
      allowNull: false,
      unique: true,
      validate: {
        isLowercase: true,
        async isUnique(value) {
          let role = await sequelize.models.Role.findOne({ where: { slug: value }});
          if (role != null) {
            throw new Error('Permission name already used.');
          }
        }
      }
    },
    status: DataTypes.BOOLEAN,
    created_by: DataTypes.INTEGER,
  }, {
    hooks: {
      beforeValidate: function (model, options) {
        if (typeof model.name === 'string') {
          model.slug = model.name.toLowerCase();
          model.slug = model.slug.replace(/[^a-zA-Z-_ ]/g, "");
          model.slug = model.slug.replace(/[^a-zA-Z]/g, "-");
        }
      }
    },
    sequelize,
    modelName: 'Role',
    tableName: 'roles',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  Role.associate = function(models) {
    Role.belongsToMany(models.User, {through: 'UserRole', foreignKey: 'role_id', as: 'users'})
    Role.belongsToMany(models.Permission, {through: 'RolePermission', foreignKey: 'role_id', as: 'permissions'})
    Role.hasMany(models.RoleTranslation, {as: 'translations'});
    Role.hasOne(models.RoleTranslation, {as: 'translation', foreignKey: 'role_id', targetKey: 'id'});
  };
  return Role;
};
