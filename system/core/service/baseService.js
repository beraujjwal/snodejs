const  { Sequelize, sequelize, Op } = require('sequelize');
const autoBind = require('auto-bind');
const { base } = require('../base');
const { baseError } = require('../error/baseError');

class baseService extends base {
  /**
   * Base Service Layer
   * @author Ujjwal Bera
   * @param null
   */
  constructor(model) {
    super();
    this.name = model;
    this.model = this.db[model];
    this.dataPerPage = this.env.DATA_PER_PAGE;
    autoBind(this);
  }

  async getAll(
    {
      orderby = 'name',
      ordering = 'ASC',
      limit = this.dataPerPage || 10,
      page = 1,
      ...search
    },
    {
      filter = null,
      include,
      attributes,
      transaction
    }
  ) {
    try {
      const order = ordering.toUpperCase();
      if(page < 1) page = 1;
      const skip = parseInt(page) * parseInt(limit) - parseInt(limit);

      if (filter === null) {
        filter = await this.generateQueryFilterFromQueryParams(search);
      }

      const result = await this.model.findAll({
        attributes: attributes,
        where: filter,
        include: include,
        order: [
          [orderby, order],
        ],
        limit: parseInt(limit),
        offset: skip,
        transaction
      });

      const count = await this.model.count({
        where: filter,
        include: include,
        transaction
      });

      return {
        rows: result,
        count,
      };
    } catch (ex) {
      throw new baseError(ex.message || `Some error occurred while fetching ${this.name}s list.`, 400);
    }
  }

  async get(search, session) {
    try {
      const filter = await this.generateQueryFilterFromQueryParams(search);
      const item = await this.model.findOne(filter).session(session);
      if (item) {
        return item;
      }

      throw new baseError(`Some error occurred while fetching ${this.name} details.`, 410);
    } catch (ex) {
      throw new baseError(ex.message || `Some error occurred while fetching ${this.name} details.`, 400);
    }
  }

  async getById(id, session) {
    try {
      const search = { _id: id,  deleted: false };
      return await this.get(search, session);
    } catch (ex) {
      throw new baseError(ex.message || `Some error occurred while fetching ${this.name} details.`, 400);
    }
  }

  async addNew(data, { transaction }) {
    try {
      Object.keys(data).forEach(
        (key) => data[key] === undefined && delete data[key],
      );
      let item = await this.model.create(data, transaction);
      if (item) {
        return item;
      }
      throw new baseError(`Some error occurred while adding this new ${this.name}.`);
    } catch (ex) {
      throw new baseError(ex.message || `Some error occurred while adding new ${this.name}.`, 400);
    }
  }

  async insertMany(data, session) {
    try {
      const item = await this.model.insertMany(data).session(session);

      if (item) {
        return item;
      }
      throw new baseError(`Some error occurred while adding new ${this.name}s.`);
    } catch (ex) {
      throw new baseError(ex.message || `Some error occurred while adding new ${this.name}s.`, 400);
    }
  }

  async updateById(id, data, session) {
    try {
      const search = { _id: id,  deleted: false };
      return await this.update(search, data, session);
    } catch (ex) {
      throw new baseError(ex.message || `Some error occurred while updating the ${this.name}.`, 400);
    }
  }

  async update(search, data, session) {
    try {
      const filter = await this.generateQueryFilterFromQueryParams(search);
      const dbItem = await this.get(filter, session);
      if (!dbItem) {
        throw new baseError(`Some error occurred while fetching the ${this.name} details.`, 500);
      }
      Object.keys(data).forEach(
        (key) => data[key] === undefined && delete data[key],
      );

      const item = await this.model.updateOne(filter, data).session(session);
      if (!item) {
        throw new baseError(`Some error occurred while updating the ${this.name}.`, 500);
      }

      const oldDBItem = JSON.parse(JSON.stringify(dbItem));
      const newTeamDetails = { ...oldDBItem, ...data };
      return newTeamDetails;

    } catch (ex) {
      throw new baseError(ex.message || `Some error occurred while updating the ${this.name}.`, ex.statusCode || 400);
    }
  }

  async updateMany(search, data, session) {
    try {
      const filter = await this.generateQueryFilterFromQueryParams(search);
      Object.keys(data).forEach(
        (key) => data[key] === undefined && delete data[key],
      );

      const item = await this.model.updateMany(filter, data).session(session);
      if (!item) {
        throw new baseError(`Some error occurred while updating the ${this.name}s.`, 500);
      }

      return item;

    } catch (ex) {
      throw new baseError(ex.message || `Some error occurred while updating the ${this.name}.`, ex.statusCode || 400);
    }
  }

  async deleteById(id, session) {
    try {
      let filter = { _id: id,  deleted: false };
      return await this.delete(filter, session);
    } catch (ex) {
      throw new baseError(ex.message || `Some error occurred while deleting the ${this.name}.`, ex.statusCode || 400);
    }
  }

  async delete(search, session) {
    try {
      const filter = await this.generateQueryFilterFromQueryParams(search);
      const item = await this.model.deleteOne(filter).session(session);
      if (item) {
        return item;
      }
      throw new baseError(`Some error occurred while deleting the ${this.name}.`, 500);
    } catch (ex) {
      throw new baseError(ex.message || `Some error occurred while deleting the ${this.name}.`, ex.statusCode || 400);
    }
  }

  async deleteMany(search, session) {
    try {
      const filter = await this.generateQueryFilterFromQueryParams(search);
      const count = await this.model.deleteMany(filter).session(session);
      if (count) {
        return count;
        //returns {deletedCount: x}
      }
      throw new baseError(`Some error occurred while deleting the ${this.name}.`, 500);
    } catch (ex) {
      throw new baseError(ex.message || `Some error occurred while deleting the ${this.name}.`, ex.statusCode || 400);
    }
  }

  async generateQueryFilterFromQueryParams(search){
    try {
      let filter = [];
      for (const field in search) {
        let filterValue;
        if (typeof search[field] === 'number' || typeof search[field] === 'boolean') {
          filter.push({
            [field] : search[field]
          });
        } else if (typeof search[field] === 'string') {
          filter.push({
            [field] : {
              [Op.like]: `%${search[field]}%`
            }
          });
        }
      }
      return filter;
    } catch (ex) {
      throw new baseError(ex.message || `Some error occurred while generating query.`, ex.statusCode || 400);
    }
  }
}

module.exports = { baseService };
