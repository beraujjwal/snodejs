'use strict';
const { sequelize, DataTypes } = require('../system/core/db.connection');
const User = require('./user.model');

const Role = sequelize.define("Role",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      parentID: {
        type: DataTypes.BIGINT,
        references: {
           model: 'roles',
           key: 'id',
        },
        validate: {
          isInt: true,
          notIn: [[1, 2]]
        }
      },
      name: {
        type: DataTypes.STRING,
        required : true,
        index : true,
        allowNull: false,
        validate: {
          isAlpha: true,
          notIn: [['Super Admin', 'Admin']]
        }
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
            const role = await sequelize.models.Role.findOne({ where: { slug: value, parentId: this.parentId }});
            if (role) {
              throw new Error('Role name already used.');
            }
          }
        }
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        comment: 'This column is for checking if the role is active or not.'
      },
    },
    {
      timestamps: true,
      paranoid: true,
      sequelize,
      modelName: 'Role',
      tableName: 'roles',
      indexes: [ { unique: true, fields: [ 'name', 'slug'] } ],
      defaultScope: {
        attributes: { exclude: [ 'deletedAt', 'deletedBy', 'createdBy','updatedBy' ] },
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
  Role.belongsToMany(models.User, {
    through: {
      model: models.UserRole,
      unique: true,
      scope: {
        status: true
      }
    },
    foreignKey: "roleID",
    as: "users",
    //constraints: false
  });

  Role.belongsToMany(models.Resource, {
    through: {
      model: models.RoleResourcePermission,
      unique: true,
      scope: {
        status: true
      }
    },
    foreignKey: 'roleID',
    as: 'resources',
    constraints: false
  });

  Role.belongsTo(models.User, { as: 'createdByUser', foreignKey: 'createdBy'});
  Role.belongsTo(models.User, {as: 'updatedByUser', foreignKey: 'updatedBy'});
};

module.exports = Role;
