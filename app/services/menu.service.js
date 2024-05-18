const { Sequelize, sequelize, Op } = require("sequelize");
const service = require("./service");
const { baseError } = require("../../system/core/error/baseError");
const { validationError } = require("../../system/core/error/validationError");
const menuGraph = require("../../neo4j/services/menu");

module.exports = class menu extends service {
  /**
   * menu service constructor
   * @author Ujjwal Bera
   * @param model
   */
  constructor(model) {
    super(model);
    this.model = this.getModel(model);
    this.user = this.getModel("User");
    this.userMenu = this.getModel("UserMenu");

    this.resource = this.getModel("Resource");
    this.resourcePermission = this.getModel("ResourcePermission");
  }

  static getInstance(model) {
    if (!this.instance) {
      this.instance = new menu(model);
    }
    return this.instance;
  }

  async list(queries, transaction) {
    try {
      const {
        id = null,
        ids = null,
        name = null,
        parent = null,
        orderby = "name",
        ordering = "ASC",
        limit = this.dataPerPage || 10,
        page = 1,
        return_type = null,
      } = queries;

      const order = ordering.toUpperCase();
      const skip = parseInt(page) * parseInt(limit) - parseInt(limit);

      const query = [{ parentId: parent }];

      if (name) {
        query.push({
          name: {
            [Op.like]: `%${name}%`,
          },
        });
      }
      if (id) {
        query.push({
          id: id,
        });
      }
      if (ids) {
        const idsArr = ids.split(",");
        query.push({
          id: {
            [Op.in]: idsArr,
          },
        });
      }

      const result = await this.model.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt", "deletedAt"],
        },
        where: query,
        include: [
          {
            model: this.user.unscoped(),
            as: "users",
            attributes: ["id"],
            through: {
              where: {
                status: true,
              },
              attributes: [],
            },
            where: {
              status: true,
            },
          },
          {
            model: this.user.unscoped(),
            as: "users",
            attributes: ["id"],
            through: {
              where: {
                status: true,
              },
              attributes: [],
            },
            where: {
              status: true,
            },
          },
        ],
        order: [[orderby, order]],
        limit: limit,
        offset: skip,
        transaction,
      });

      return result;
    } catch (ex) {
      console.log(ex);
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
  async create({ name, parentId, resources, status = true }, transaction) {
    try {
      let havError = false,
        resourceName = null,
        resourceIds = [],
        resourceRightsAvailable = [];
      if (resources) {
        for await (const resource of resources) {
          if (resource?.id === 1)
            throw new baseError("You have selected an invalid resource.");
          resourceIds.push(resource?.id);
        }

        const dbResources = await this.resource.find({
          slug: { $in: resourceIds },
          status: true,
        });

        if (dbResources.length != rights.length) {
          throw new baseError("You have selected an invalid resource.", 412);
        }

        for await (const resource of resources) {
          const dbResourcePermissions = await this.resourcePermission.find({
            resourceId: resource.id,
            permissionId: { $in: resource.rights },
            status: true,
          });

          if (dbResourcePermissions.length != resource.rights.length) {
            throw new baseError(
              "You have selected an invalid permission for some resource.",
              412
            );
          }
        }
      }

      const menu = await this.model.create(
        [
          {
            parentId,
            name,
            description,
            status,
          },
        ],
        { transaction }
      );

      await menuGraph.create(menu[0]);
      return menu[0];
    } catch (ex) {
      throw new baseError(ex);
    }
  }

  /**
   * @author Ujjwal Bera
   *
   * @param {*} menuId
   * @returns
   */
  async menuDetails(menuId) {
    try {
      let menu = await this.model
        .findOne({
          _id: menuId,
          deleted: false,
        })
        .populate();
      if (!menu) {
        throw new baseError("Menu not found with this given details.");
      }
      return menu;
    } catch (ex) {
      throw new baseError(ex);
    }
  }

  /**
   * @description Update menu by menu ID
   * @author Ujjwal Bera
   *
   * @param {*} menuId
   * @param {*} name
   * @param {*} rights
   * @param {*} status
   * @returns
   */
  async menuUpdate(menuId, parent, name, description, rights, status) {
    try {
      let menu = await this.model.findOne({
        _id: menuId,
        deleted: false,
      });
      if (!menu) {
        throw new baseError("Menu not found.", 404);
      }

      if (menu.slug === "super-admin") {
        throw new baseError("This menu is not editable.", 403);
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
          throw new baseError("You have selected an invalid resource.", 400);
        }
      }

      const data = {
        parent: parent,
        name: name,
        status: status,
        rights: rights,
      };

      let filter = { _id: menuId };
      await this.model.updateOne(filter, { $set: data });

      return await this.menuDetails(menuId);
    } catch (ex) {
      throw new baseError(ex.message, ex.status || 500);
    }
  }

  /**
   * @author Ujjwal Bera
   *
   * @param {*} menuId
   * @returns
   */
  async menuCanDelete(menuId) {
    try {
      let menu = await this.model.findOne({
        parent: menuId,
        deleted: false,
      });
      if (!menu) {
        throw new baseError("Menu not found.");
      }

      await menu.delete();

      return await this.model.findOne({
        _id: menuId,
        deleted: true,
      });
    } catch (ex) {
      throw new baseError(ex);
    }
  }

  /**
   * @author Ujjwal Bera
   *
   * @param {*} menuId
   * @returns
   */
  async menuDelete(menuId) {
    try {
      const menu = await this.model.findOne({
        _id: menuId,
        deleted: false,
      });
      if (!menu) {
        throw new baseError("Menu not found.");
      }

      //If menu have child menus then don't allow delete operation
      const childs = await this.model.find({ parent: menuId, deleted: false });
      if (childs.length > 0)
        throw new baseError(
          "Some child menu belongs to this menu. If you still want to delete the menu? Then delete those child menu belongs to this menu or shift them into a different menu or make them parent menu.",
          401
        );

      //If menu have users then don't allow delete operation
      const users = await this.user.find({ menus: { $all: [menuId] } });
      if (users.length > 0)
        throw new baseError(
          "Some user belongs to this menu. If you still want to delete the menu? Then delete those user belongs to this menu or shift them into a different menu.",
          401
        );

      await menu.delete();
      return await this.model.findOne({
        _id: menuId,
        deleted: true,
      });
    } catch (ex) {
      throw new baseError(ex);
    }
  }

  /**
   * @author Ujjwal Bera
   *
   * @param {*} menuId
   * @returns
   */
  async checkUserMenuAvailablity(
    { menus, parentMenu, defaultMenu = "admin" },
    transaction
  ) {
    try {
      if (!menus) {
        menus = [defaultMenu]; // if menu is not selected, setting default menu for new user
      }

      let dbMenus = await this.model
        .find({ slug: { $in: menus } })
        .populate({
          path: "menu",
          match: {
            slug: parentMenu,
          },
        })
        .transaction(transaction)
        .exec();
      if (dbMenus.length !== menus.length) {
        throw new validationError(
          { menus: ["You have selected an invalid menu."] },
          412
        );
      }
      return dbMenus.map((menu) => menu._id);
    } catch (ex) {
      console.log("Menu service", ex);
      throw new baseError(
        ex ||
          "An error occurred while creating your account. Please try again.",
        ex.code
      );
    }
  }

  async createUserMenu({ userId, menus }, transaction) {
    try {
      if (!menus) throw new baseError(__("INVALI_ROLES_SELECTED"));

      const dbMenus = await this.model.findAll({
        attribuites: ["id"],
        where: {
          id: { [Op.or]: menus },
        },
      });

      if (dbMenus.length < 1) throw new baseError(__("INVALI_ROLES_SELECTED"));
      const userMenus = [];
      dbMenus.forEach(async (menu) => {
        userMenus.push({
          userId: userId,
          menuId: menu.id,
          status: true,
          deletedAt: null,
        });
      });
      const dbUserMenus = await this.userMenu.findAll(
        { where: { userId }, paranoid: false },
        { transaction }
      );
      if (dbUserMenus.length > 0) {
        if (dbMenus.length === dbUserMenus.length) {
          let count = 0;
          dbUserMenus.forEach(async (dbUserMenu) => {
            await this.updateUserMenu(
              dbUserMenu.id,
              userMenus[count],
              transaction
            );
            count++;
          });
        } else if (dbMenus.length > dbUserMenus.length) {
          dbUserMenus.forEach(async (dbUserMenu) => {
            const userMenu = userMenus.shift();
            await this.updateUserMenu(dbUserMenu.id, userMenu, transaction);
          });
          return await this.userMenu.bulkCreate(userMenus, { transaction });
        } else if (dbMenus.length < dbUserMenus.length) {
          let count = 0;
          const haveToDeleteIds = [];
          dbUserMenus.forEach(async (dbUserMenu) => {
            if (userMenus[count]) {
              await this.updateUserMenu(
                dbUserMenu.id,
                userMenus[count],
                transaction
              );
            } else {
              haveToDeleteIds.push(dbUserMenu.id);
            }
            count++;
          });
          await this.userMenu.destroy(
            { where: { id: { [Op.in]: haveToDeleteIds } } },
            { transaction }
          );
        }
      } else {
        return await this.userMenu.bulkCreate(userMenus, { transaction });
      }
    } catch (ex) {
      throw new baseError(ex);
    }
  }

  async updateUserMenu(userMenuId, userMenuData, transaction) {
    try {
      await this.userMenu.update(userMenuData, {
        where: { id: userMenuId },
        transaction,
      });
    } catch (ex) {
      throw new baseError(ex);
    }
  }

  async createUserMenu2({ userId, menus }, transaction) {
    try {
      if (!menus) {
        throw new baseError("INVALID_ROLES_SELECTED");
      }

      const dbMenus = await this.model.findAll({
        attributes: ["id"],
        where: {
          slug: { [Op.or]: menus },
        },
      });

      if (dbMenus.length < 1) {
        throw new baseError("INVALID_ROLES_SELECTED");
      }

      const userMenus = dbMenus.map((menu) => ({
        userId: userId,
        menuId: menu.id,
        status: true,
        deletedAt: null,
      }));
      const dbUserMenus = await this.userMenu.findAll(
        { where: { userId }, paranoid: false },
        { transaction }
      );

      if (dbMenus.length === dbUserMenus.length) {
        for (let i = 0; i < dbMenus.length; i++) {
          await this.updateUserMenu(
            dbUserMenus[i].id,
            userMenus[i],
            transaction
          );
        }
      } else {
        const menusToUpdate = Math.min(dbMenus.length, dbUserMenus.length);

        for (let i = 0; i < menusToUpdate; i++) {
          await this.updateUserMenu(
            dbUserMenus[i].id,
            userMenus[i],
            transaction
          );
        }

        if (dbMenus.length > dbUserMenus.length) {
          await this.userMenu.bulkCreate(userMenus.slice(menusToUpdate), {
            transaction,
          });
        } else {
          const menusToDelete = dbUserMenus.slice(menusToUpdate);

          for (const menuToDelete of menusToDelete) {
            await this.userMenu.destroy(
              { where: { id: menuToDelete.id } },
              { transaction }
            );
          }
        }
      }
    } catch (ex) {
      throw new baseError(ex.message);
    }
  }

  /**
   * @author Ujjwal Bera
   *
   * @param {*} menuId
   * @returns
   */
  async deleteByPk(menuId, transaction) {
    try {
      const menu = await this.model.findOne({
        _id: menuId,
        deleted: false,
      });
      if (!menu) {
        throw new baseError("Menu not found.");
      }

      //If menu have child menus then don't allow delete operation
      const childs = await this.model.find({ parent: menuId, deleted: false });
      if (childs.length > 0)
        throw new baseError(
          "Some child menu belongs to this menu. If you still want to delete the menu? Then delete those child menu belongs to this menu or shift them into a different menu or make them parent menu.",
          401
        );

      //If menu have users then don't allow delete operation
      const users = await this.user.find({ menus: { $all: [menuId] } });
      if (users.length > 0)
        throw new baseError(
          "Some user belongs to this menu. If you still want to delete the menu? Then delete those user belongs to this menu or shift them into a different menu.",
          401
        );

      await menu.delete();
      return await this.model.findOne({
        _id: menuId,
        deleted: true,
      });
    } catch (ex) {
      throw new baseError(ex);
    }
  }
};
