'use strict';
const { DataTypes } = require('sequelize');
const sequelize = require('../system/core/db.connection');

const Role = sequelize.define("Role",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      parentId: {
        type: DataTypes.INTEGER,
        references: {
           model: 'roles',
           key: 'id',
        }
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
            var role = await sequelize.models.Role.findOne({ where: { slug: value }});
            if (role != null) {
              throw new Error('Role name already used.');
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
      modelName: 'Role',
      tableName: 'roles',
      indexes: [ { unique: true, fields: [ 'name', 'slug'] } ],
      defaultScope: {
        attributes: {
          // include: [[Sequelize.fn("COUNT", Sequelize.col("users.id")), "UsersCount"]],
          exclude: [ 'createdAt', 'updatedAt', 'deletedAt' ]
        },
        // include: [
        //   {
            // model: User,
            // as: 'users',
            // attributes: { include: [] },
            // through:{
            //   where: {
            //     status: true,
            //   },
            //   attributes: []
            // },
            // where: {
            //   status: true,
            // },
        //   }
        // ],
      },
      scopes: {
        withPermissions: {
          attributes: { exclude: [ 'createdAt', 'updatedAt', 'deletedAt' ] }
        }
      },
      instanceMethods: {
        // async generateHash(password) {
        //   const salt = await bcrypt.genSalt(saltRounds);
        //   return bcrypt.hashSync(user.password, salt);
        // },
        // async validPassword(password) {
        //     return bcrypt.compareSync(password, this.password);
        // }
      },
      hooks: {
        beforeCreate: async (user) => {
          // if (user.password) {
          //   const salt = await bcrypt.genSalt(saltRounds);
          //   user.password = bcrypt.hashSync(user.password, salt);
          // }
        },
        beforeUpdate:async (user) => {
          // if (user.password) {
          //   const salt = await bcrypt.genSalt(saltRounds);
          //   user.password = bcrypt.hashSync(user.password, salt);
          // }
        }
      }
    }
);

Role.associate = function(models) {
  Role.belongsToMany(models.User, {through: 'UserRole', foreignKey: 'roleId', as: 'users'});
  Role.belongsToMany(models.Permission, {through: 'RolePermission', foreignKey: 'roleId', as: 'permissions'});
};

module.exports = Role;
