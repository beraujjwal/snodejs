'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Permission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Permission.init({
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
          var permission = await sequelize.models.Permission.findOne({ where: { slug: value }});
          if (permission != null) {
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
      },
      afterValidate: (permission, options) => {

      },
      afterCreate: (async (permission, options) => {

        var admins = await sequelize.models.Role.findAll({ where: {slug: 'admin'}});

        admins.forEach(admin => {
        	//console.log(admin); // Logs each 'Admin #'
          sequelize.models.RolePermission.create({
            permission_id: permission.id,
            role_id: admin.id,
            permission: 'READ_WRITE',
            status: true,
            created_by: 1,
            created_at: new Date(),
            updated_at: new Date()
          });
        });


      })
    },
    sequelize,
    modelName: 'Permission',
    tableName: 'permissions',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  Permission.associate = function(models) {
    Permission.belongsToMany(models.User, {through: 'UserPermission', foreignKey: 'permission_id', as: 'user_permissions'})
    Permission.belongsToMany(models.Role, {through: 'RolePermission', foreignKey: 'permission_id', as: 'role_permissions'})
  };
  return Permission;
};
