'use strict';
const { DataTypes } = require('sequelize');
const sequelize = require('../system/core/db.connection');

const Permission = sequelize.define("Permission",
    {
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
    },
    {
      timestamps: true,
      paranoid: true,
      sequelize,
      modelName: 'Permission',
      tableName: 'permissions',
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
    }
);

Permission.associate = function(models) {
  Permission.belongsToMany(models.User, {through: 'UserPermission', foreignKey: 'permissionId', as: 'user_permissions'});
  Permission.belongsToMany(models.Role, {through: 'RolePermission', foreignKey: 'permissionId', as: 'role_permissions'});
};

module.exports = Permission;