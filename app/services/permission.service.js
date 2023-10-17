const { service } = require( './service' );
const { baseError } = require('../../system/core/error/baseError');

const permissionGraph = require('../../neo4j/services/permission');

class permission extends service {
  /**
   * permission service constructor
   * @author Ujjwal Bera
   * @param null
   */
  constructor(model) {
    super(model);
    this.model = this.db[model];

  }

  async getAll(queries, { transaction }) {
    try {
      const {
        id = null,
        ids = null,
        name = null,
        orderby = 'name',
        ordering = 'ASC',
        limit = this.dataPerPage || 10,
        page = 1,
        return_type = null,
      } = queries;

      const order = ordering.toUpperCase();
      const skip = parseInt(page) * parseInt(limit) - parseInt(limit);

      const query = [];

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
        order: [
          [orderby, order],
        ],
        limit: parseInt(limit),
        offset: skip,
        transaction
      });

      const count = await this.model.count({
        attributes: {
          exclude: [ 'createdAt', 'updatedAt', 'deletedAt' ]
        },
        where: query,
        order: [
          [orderby, order],
        ],
        limit: parseInt(limit),
        offset: skip,
        transaction
      });



      return {
        rows: result,
        count,
      };
    } catch (ex) {
      console.log(ex)
      throw new baseError(ex);
    }
  }

  async addNew( { name, status = true }, { transaction }) {
    try {
      const permission = await this.model.create({
        name,
        status,
      }, transaction);

      return permission;
    } catch (ex) {
      throw new baseError(ex);
    }
  }

  async findByPk(id, { transaction }) {
    try {
      let permission = await this.model.findByPk(id, { transaction });
      if (!permission) {
        throw new baseError('Permission not found with this given details.');
      }
      return permission;
    } catch (ex) {
      throw new baseError(ex);
    }
  }

  async updateByPk(id, data, { transaction }) {
    try {
      console.log(data);
      await this.model.update(data, {
        where: {
          id: id
        },
        transaction,
      });

      return await this.findByPk(id, { transaction });
    } catch (ex) {
      console.log(ex);
      throw new baseError(ex);
    }
  }

  async permissionDelete(permissionId) {
    try {
      return await this.delete({ _id: permissionId });
    } catch (ex) {
      throw new baseError(ex);
    }
  }
}

module.exports = { permission };
