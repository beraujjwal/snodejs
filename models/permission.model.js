'use strict';
const { sequelize, DataTypes } = require('../system/core/db.connection');
const User = require('./user.model');

const Permission = sequelize.define("Permission",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true
      },
      name: {
        type: DataTypes.STRING,
        required : true,
        index : true,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true
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
            var permission = await sequelize.models.Permission.findOne({ where: { slug: value }});
            if (permission != null) {
              throw new Error('Permission name already used.');
            }
          }
        }
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        comment: 'This column is for checking if the permission is active or not.'
      },
    },
    {
      timestamps: true,
      paranoid: true,
      sequelize,
      modelName: 'Permission',
      tableName: 'permissions',
      indexes: [ { unique: true, fields: [ 'name', 'slug'] } ],
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
        // withRoles: {
        //   attributes: { exclude: ['password'] },
        //   // include: [
        //   //   { model: SecretClub, as: 'secretClub' },
        //   //   { model: Item, as: 'items' }
        //   // ]
        // }
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
      classMethods: {
        // associate: function (models) {
        //     Article.belongsTo(models.User, {as: "Author", onDelete: 'CASCADE', foreignKey: { field:'author_id', allowNull: false }});
        // },
        setterMethods: {
            name : function(v) {
                this.setDataValue('name', v.toString());
                this.setDataValue('slug', slugify(v));
            }
        },
      },
      hooks: {
        beforeValidate: function (model, options) {
          if (typeof model.name === 'string') {
            model.slug = model.name.toLowerCase();
            model.slug = model.slug.replace(/[^1-9a-zA-Z-_ ]/g, "");
            model.slug = model.slug.replace(/[^1-9a-zA-Z]/g, "-");
          }
          if (model.status !== false) {
            model.status = true;
          }
        },
        afterValidate: (permission, options) => {

        },
        afterCreate: (async (permission, options) => {

          // const admins = await sequelize.models.Role.findAll({ where: {slug: 'admin'}});

          // admins.forEach(admin => {
          //   //console.log(admin); // Logs each 'Admin #'
          //   sequelize.models.RolePermission.create({
          //     permission_id: permission.id,
          //     role_id: admin.id,
          //     permission: 'READ_WRITE',
          //     status: true,
          //     created_by: 1,
          //     created_at: new Date(),
          //     updated_at: new Date()
          //   });
          // });


        })
      },
    }
);

Permission.associate = function(models) {




  Permission.belongsToMany(models.Resource, {
    through: {
      model: models.RoleResourcePermission,
      //unique: false,
      scope: {
        status: true
      }
    },
    //otherKey: 'permissionID',
    foreignKey: 'permissionID',
    as: 'roleResourcePermissions',
    constraints: true
  });

  Permission.belongsToMany(models.Resource, {
    through: {
      model: models.UserResourcePermission,
      //unique: false,
      scope: {
        status: true
      }
    },
    //otherKey: 'permissionID',
    foreignKey: 'permissionID',
    as: 'userResourcePermissions',
    constraints: true
  });




  Permission.belongsToMany(models.Permission, {
    through: {
      model: models.UserResourcePermission,
      unique: false,
      scope: {
        status: true
      }
    },
    //targetKey: 'id',
    foreignKey: 'permissionID',
    as: 'userPermissions',
    //constraints: false
  });

  Permission.belongsToMany(models.Permission, {
    through: {
      model: models.RoleResourcePermission,
      unique: false,
      scope: {
        status: true
      }
    },
    //targetKey: 'id',
    foreignKey: 'permissionID',
    as: 'rolePermissions',
    constraints: true
  });

  Permission.belongsTo(models.User, { as: 'addedBy', foreignKey: 'createdBy'});
  Permission.belongsTo(models.User, {as: 'editedBy', foreignKey: 'updatedBy'});
};

module.exports = Permission;