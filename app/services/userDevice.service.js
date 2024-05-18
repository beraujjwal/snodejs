const service = require("./service");
const { baseError } = require("../../system/core/error/baseError");

const resourceGraph = require("../../neo4j/services/resource");

module.exports = class userDevice extends service {
  /**
   * @description resource service constructor
   * @param null
   * @author Ujjwal Bera
   */
  constructor(model) {
    super(model);
    this.model = this.getModel(model);
  }

  static getInstance(model) {
    if (!this.instance) {
      this.instance = new userDevice(model);
    }
    return this.instance;
  }

  async getAll(queries, transaction) {
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

      const result = await this.model.unscoped().findAll({
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
   * @description Storing a new resource permission
   * @param {object} object
   * @returns object
   * @author Ujjwal Bera
   */
  async create({ resourceId, permissionId, status = true }, transaction) {
    try {
      const resourcPermission = await super.create(
        {
          resourceId,
          permissionId,
          status,
        },
        { transaction }
      );
      return resourcPermission;
    } catch (ex) {
      throw new baseError(
        ex.message ||
          "An error occurred while storing a new resource permission.",
        ex.status
      );
    }
  }

  /**
   * @description Updating a resource details identified by the given resource ID.
   * @param {String} resourceId
   * @param {*} name
   * @param {*} status
   * @returns object
   * @author Ujjwal Bera
   */
  async updateInfo(deviceInfo) {
    try {
      let query = {};
      if (deviceInfo.fcmToken) {
        query = {
          fcmToken: deviceInfo.fcmToken,
          browser: deviceInfo.browser,
        };
      } else {
        query = {
          mac: deviceInfo.mac,
          browser: deviceInfo.browser,
        };
      }
      let device = await this.model.findOne(query);
      if (deviceInfo.accessToken && !device)
        throw new baseError(
          "You can't access our app in this session. Please login again."
        );

      if (deviceInfo.accessToken !== device.userToken)
        throw new baseError(
          "You can't access our app in this session. Please login again."
        );

      let data = {};

      if (name != null) {
        data.name = name;
      }

      if (status != null) {
        data.status = status;
      }

      let filter = { _id: resourceId };
      await this.model.updateOne(filter, { $set: data });

      return await this.resourceDetails(resourceId);
    } catch (ex) {
      throw new baseError(
        ex.message || "An error occurred while updating a resource details.",
        ex.status
      );
    }
  }

  /**
   * @description Delete a resource identified by the given resource ID.
   * @param {*} resourceId  - The ID of the resource to be deleted.
   * @returns
   * @author Ujjwal Bera
   */
  async resourceDelete(resourceId) {
    try {
      let resource = await this.model.findOne({
        _id: resourceId,
        deleted: false,
      });
      if (!resource)
        throw new baseError("You have selected an invalid resource.");

      await resource.delete();

      return await this.model.findOne({
        _id: resourceId,
        deleted: true,
      });
    } catch (ex) {
      throw new baseError(
        ex.message || "An error occurred while deleting a resource details.",
        ex.status
      );
    }
  }
};
