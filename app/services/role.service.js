const  { Sequelize, sequelize, Op } = require('sequelize');
const { service } = require( './service' );
const { baseError } = require('../../system/core/error/baseError');
const { validationError } = require('../../system/core/error/validationError');
const roleGraph = require('../../neo4j/services/role');

class role extends service {
  /**
   * role service constructor
   * @author Ujjwal Bera
   * @param model
   */
  constructor(model) {
    super(model);
    this.model = this.db[model];
    this.user = this.db['User'];
    this.userRole = this.db['UserRole'];
  }

  async getAll(queries, transaction) {
    try {
      const {
        id = null,
        ids = null,
        name = null,
        parent = null,
        orderby = 'name',
        ordering = 'ASC',
        limit = this.dataPerPage || 10,
        page = 1,
        return_type = null,
      } = queries;

      const order = ordering.toUpperCase();
      const skip = parseInt(page) * parseInt(limit) - parseInt(limit);

      const query = [{ parentId: parent }];

      if(name) {
        query.push({
          name: {
            [Op.like]: `%${name}%`
          }
        });
      }
      if(id) {
        query.push({
          id: id
        });
      }
      if(ids) {
        const idsArr = ids.split(',');
        query.push({
          id: {
            [Op.in]: idsArr
          }
        });
      }

      const result = await this.model.findAll({
        attributes: {
          exclude: [ 'createdAt', 'updatedAt', 'deletedAt' ]
        },
        where: query,
        include: [
          {
            model: this.user.unscoped() ,
            as: 'users',
            attributes: ['id'],
            through:{
              where: {
                status: true,
              },
              attributes: []
            },
            where: {
              status: true,
            },
          },
          {
            model: this.user.unscoped() ,
            as: 'users',
            attributes: ['id'],
            through:{
              where: {
                status: true,
              },
              attributes: []
            },
            where: {
              status: true,
            },
          }
        ],
        order: [
          [orderby, order],
        ],
        limit: limit,
        offset: skip,
        transaction
      });

      return result;
    } catch (ex) {
      console.log(ex)
      throw new baseError(ex);
    }
  }

  /**
   * @author Ujjwal Bera
   *
   * @param {*} parent
   * @param {*} name
   * @param {*} rights
   * @returns
   */
  async createNew({ name, parentId, status = true }, transaction) {
    try {
      let havError = false, resourceName = null, rightSlugs = [], resourceRightsAvailable = [];
      if (rights != null) {

        for await (const right of rights) {
          if(right.resource === 'root') throw new baseError('You have selected an invalid resource.');

          rightSlugs.push(right.resource);
          const resource = right.resource;
          delete right.resource;
          resourceRightsAvailable[resource] = right;
        }
        let dbResources = await this.resource.find({
          slug: { $in: rightSlugs },
        });
        if (dbResources.length != rights.length) {
          throw new baseError('You have selected an invalid resource.', 412);
        }

        await dbResources.forEach(async(resource) => {
          const selectedResourceRights = resourceRightsAvailable[resource.slug];
          for (const key in selectedResourceRights) {
            if (selectedResourceRights.hasOwnProperty(key)) {
              const rightsAvailable = resource.rightsAvailable;
              if (!rightsAvailable.includes(key)) {
                havError = true;
                resourceName = resource.name;
                break;
              }
            }
          }
        });
      }

      if(havError === true) throw new baseError(`You have selected an invalid right for ${resourceName}.`, 412);

      const role = await this.model.create([{
        parent,
        name,
        description,
        rights,
        status,
      }], { transaction });

      await roleGraph.create(role[0]);
      return role[0];
    } catch (ex) {
      throw new baseError(ex);
    }
  }

  /**
   * @author Ujjwal Bera
   *
   * @param {*} roleId
   * @returns
   */
  async roleDetails(roleId) {
    try {
      let role = await this.model.findOne({
        _id: roleId,
        deleted: false,
      }).populate();
      if (!role) {
        throw new baseError('Role not found with this given details.');
      }
      return role;
    } catch (ex) {
      throw new baseError(ex);
    }
  }

  /**
   * @description Update role by role ID
   * @author Ujjwal Bera
   *
   * @param {*} roleId
   * @param {*} name
   * @param {*} rights
   * @param {*} status
   * @returns
   */
  async roleUpdate(roleId, parent, name, description, rights, status) {
    try {
      let role = await this.model.findOne({
        _id: roleId,
        deleted: false,
      });
      if (!role) {
        throw new baseError('Role not found.', 404);
      }

      if(role.slug === 'super-admin') {
        throw new baseError('This role is not editable.', 403);
      }

      if (rights != null) {
        let rightSlugs = [];
        for await (const right of rights) {
          rightSlugs.push(right.resource);
        }
        let dbResources = await this.resource.find({
          slug: { $in: rightSlugs },
        });
        if (dbResources.length != rights.length) {
          throw new baseError('You have selected an invalid resource.', 400);
        }
      }

      const data = {
        parent: parent,
        name: name,
        status: status,
        rights: rights,
      };

      let filter = { _id: roleId };
      await this.model.updateOne(filter, { $set: data });

      return await this.roleDetails(roleId);
    } catch (ex) {
      throw new baseError(ex.message, ex.status || 500);
    }
  }

  /**
   * @author Ujjwal Bera
   *
   * @param {*} roleId
   * @returns
   */
  async roleCanDelete(roleId) {
    try {
      let role = await this.model.findOne({
        parent: roleId,
        deleted: false,
      });
      if (!role) {
        throw new baseError('Role not found.');
      }

      await role.delete();

      return await this.model.findOne({
        _id: roleId,
        deleted: true,
      });
    } catch (ex) {
      throw new baseError(ex);
    }
  }

  /**
   * @author Ujjwal Bera
   *
   * @param {*} roleId
   * @returns
   */
  async roleDelete(roleId) {
    try {
      const role = await this.model.findOne({
        _id: roleId,
        deleted: false,
      });
      if (!role) {
        throw new baseError('Role not found.');
      }

      //If role have child roles then don't allow delete operation
      const childs = await this.model.find({ parent: roleId, deleted: false });
      if(childs.length > 0) throw new baseError('Some child role belongs to this role. If you still want to delete the role? Then delete those child role belongs to this role or shift them into a different role or make them parent role.', 401);

      //If role have users then don't allow delete operation
      const users = await this.db['User'].find({ roles : { $all : [roleId] }});
      if(users.length > 0) throw new baseError('Some user belongs to this role. If you still want to delete the role? Then delete those user belongs to this role or shift them into a different role.', 401);

      await role.delete();
      return await this.model.findOne({
        _id: roleId,
        deleted: true,
      });
    } catch (ex) {
      throw new baseError(ex);
    }
  }

  /**
   * @author Ujjwal Bera
   *
   * @param {*} roleId
   * @returns
   */
  async checkUserRoleAvailablity( {roles, parentRole, defaultRole = 'admin'}, transaction ){
    try{
      if (!roles) {
        roles = [defaultRole]; // if role is not selected, setting default role for new user
      }

      let dbRoles = await this.db['Role'].find({ slug: { $in: roles }}).populate({
        path: 'role',
        match: {
          slug: parentRole
        }
      }).transaction(transaction).exec();
      if (dbRoles.length !== roles.length) {
        throw new validationError({ roles: ['You have selected an invalid role.']}, 412);
      }
      return dbRoles.map((role) => role._id);
    } catch (ex) {
      console.log('Role service', ex);
      throw new baseError(
        ex || 'An error occurred while creating your account. Please try again.',
        ex.code
      );
    }

  }



  async createUserRole({userId, roles}, transaction) {
    try {
      if (!roles) throw new baseError(__('INVALI_ROLES_SELECTED'));

      const dbRoles = await this.model.findAll({
        attribuites: ['id'],
        where: {
          slug: { [Op.or]: roles }
        }
      });

      if (dbRoles.length < 1) throw new baseError(__('INVALI_ROLES_SELECTED'));
      const userRoles = [];
      dbRoles.forEach( async (role) => {
        userRoles.push({ userId: userId,  roleId: role.id, status: true, deletedAt: null });
      });
      const dbUserRoles = await this.userRole.findAll({ where: { userId }, paranoid: false }, { transaction });
      if (dbUserRoles.length > 0) {
        if(dbRoles.length === dbUserRoles.length) {
          let count = 0;
          dbUserRoles.forEach( async (dbUserRole) => {
            await this.updateUserRole(dbUserRole.id, userRoles[count], transaction );
            count++;
          });

        } else if(dbRoles.length > dbUserRoles.length) {
          dbUserRoles.forEach( async (dbUserRole) => {
            const userRole = userRoles.shift();
            await this.updateUserRole(dbUserRole.id, userRole, transaction );
          });
          return await this.userRole.bulkCreate(userRoles, { transaction });
        } else if(dbRoles.length < dbUserRoles.length) {
          let count = 0;
          const haveToDeleteIds = [];
          dbUserRoles.forEach( async (dbUserRole) => {
            if(userRoles[count]) {
              await this.updateUserRole(dbUserRole.id, userRoles[count], transaction );
            } else {
              haveToDeleteIds.push(dbUserRole.id);
            }
            count++;
          });
          await this.userRole.destroy({ where: { id: { [Op.in]: haveToDeleteIds } } }, { transaction });
        }
      } else {
        return await this.userRole.bulkCreate(userRoles, { transaction });
      }

    } catch (ex) {
      throw new baseError(ex);
    }
  }


  async updateUserRole(userRoleId, userRoleData, transaction) {
    try {
      await this.userRole.update(userRoleData, {
        where: { id: userRoleId },
        transaction
      });
    } catch (ex) {
      throw new baseError(ex);
    }

  }


  async createUserRole2({ userId, roles }, transaction) {
    try {
        if (!roles) {
            throw new baseError('INVALID_ROLES_SELECTED');
        }

        const dbRoles = await this.model.findAll({
            attributes: ['id'],
            where: {
                slug: { [Op.or]: roles }
            }
        });

        if (dbRoles.length < 1) {
            throw new baseError('INVALID_ROLES_SELECTED');
        }

        const userRoles = dbRoles.map((role) => ({ userId: userId, roleId: role.id, status: true, deletedAt: null }));
        const dbUserRoles = await this.userRole.findAll({ where: { userId }, paranoid: false }, { transaction });

        if (dbRoles.length === dbUserRoles.length) {
            for (let i = 0; i < dbRoles.length; i++) {
                await this.updateUserRole(dbUserRoles[i].id, userRoles[i], transaction);
            }
        } else {
            const rolesToUpdate = Math.min(dbRoles.length, dbUserRoles.length);

            for (let i = 0; i < rolesToUpdate; i++) {
                await this.updateUserRole(dbUserRoles[i].id, userRoles[i], transaction);
            }

            if (dbRoles.length > dbUserRoles.length) {
                await this.userRole.bulkCreate(userRoles.slice(rolesToUpdate), { transaction });
            } else {
                const rolesToDelete = dbUserRoles.slice(rolesToUpdate);

                for (const roleToDelete of rolesToDelete) {
                    await this.userRole.destroy({ where: { id: roleToDelete.id } }, { transaction });
                }
            }
        }

    } catch (ex) {
        throw new baseError(ex.message);
    }
  }




}

module.exports = { role };
