const  { Sequelize, sequelize, Op } = require('sequelize');
const { base } = require('../base');
const { baseError } = require('../error/baseError');

const chalk = require('chalk');
const log = console.log;

class baseService extends base {
  /**
   * Base Service Layer
   * @author Ujjwal Bera
   * @param null
   */
  constructor(model) {
    super();
    this.model = this.db[model];
    this.dataPerPage = this.env.DATA_PER_PAGE | 15;
    this.name = model;
  }

  /**
   * @description Fetch list of items with total count
   * @author Ujjwal Bera<ujjwalbera.dev@gmail.com>
   * @param {*} param0
   * @param {*} param1
   * @returns { rows, count } response
   */
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
      limit = parseInt(limit);
      page = parseInt(page);
      if(page < 1) page = 1;
      const skip = ( page * limit ) - limit;

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
        limit: limit,
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

  /**
   * @description Fetch item by query
   * @author Ujjwal Bera<ujjwalbera.dev@gmail.com>
   * @param {*} param0
   * @param {*} param1
   * @returns { rows, count } response
   */
  async get(search, {
    filter = null,
    include,
    attributes,
    transaction
  }) {
    try {
      if (filter === null) filter = await this.generateQueryFilterFromQueryParams(search);
      const item = await this.model.findOne(filter).transaction(transaction);
      if (!item)  throw new baseError(`Some error occurred while fetching ${this.name} details.`, 410);

      return item;
    } catch (ex) {
      throw new baseError(ex.message || `Some error occurred while fetching ${this.name} details.`, 400);
    }
  }

  async findByPk(id, { transaction, include, attributes}) {

    try {
      let item = await this.model.findByPk(id, {
        include: include,
        attributes: attributes,
        transaction
      });
      if (!item) throw new baseError(`Some error occurred while fetching ${this.name} details.`, 400);
      return item;
    } catch (ex) {
      throw new baseError(ex);
    }
  }

  async create(data, { transaction } ) {
    try {
      Object.keys(data).forEach(
        (key) => data[key] === undefined && delete data[key],
      );
      let item = await this.model.create(data, transaction);
      if (!item) throw new baseError(`Some error occurred while adding this new ${this.name}.`);
      return item;

    } catch (ex) {
      throw new baseError(ex.message || `Some error occurred while adding new ${this.name}.`, 400);
    }
  }

  async bulkCreate(data, { transaction }) {
    try {
      const items = await this.model.bulkCreate(data, { transaction })

      if (!items) throw new baseError(`Some error occurred while adding new ${this.name}s.`);
      return items;

    } catch (ex) {
      throw new baseError(ex.message || `Some error occurred while adding new ${this.name}s.`, 400);
    }
  }

  async updateById(id, data, transaction) {
    try {
      const search = { _id: id,  deleted: false };
      return await this.update(search, data, transaction);
    } catch (ex) {
      throw new baseError(ex.message || `Some error occurred while updating the ${this.name}.`, 400);
    }
  }

  async update(search, data, transaction) {
    try {
      const filter = await this.generateQueryFilterFromQueryParams(search);
      const dbItem = await this.get(filter, transaction);
      if (!dbItem) {
        throw new baseError(`Some error occurred while fetching the ${this.name} details.`, 500);
      }
      Object.keys(data).forEach(
        (key) => data[key] === undefined && delete data[key],
      );

      const item = await this.model.update(filter, data, transaction);
      if (!item) throw new baseError(`Some error occurred while updating the ${this.name}.`, 500);

      const oldDBItem = dbItem.toJSON();
      const newTeamDetails = { ...oldDBItem, ...data };
      return newTeamDetails;

    } catch (ex) {
      throw new baseError(ex.message || `Some error occurred while updating the ${this.name}.`, ex.statusCode || 400);
    }
  }

  async updateMany(search, data, transaction) {
    try {
      const filter = await this.generateQueryFilterFromQueryParams(search);
      Object.keys(data).forEach(
        (key) => data[key] === undefined && delete data[key],
      );

      const item = await this.model.updateMany(filter, data).transaction(transaction);
      if (!item) throw new baseError(`Some error occurred while updating the ${this.name}s.`, 500);

      return item;

    } catch (ex) {
      throw new baseError(ex.message || `Some error occurred while updating the ${this.name}.`, ex.statusCode || 400);
    }
  }

  async deleteById(id, transaction) {
    try {
      let filter = { _id: id,  deleted: false };
      return await this.delete(filter, transaction);
    } catch (ex) {
      throw new baseError(ex.message || `Some error occurred while deleting the ${this.name}.`, ex.statusCode || 400);
    }
  }

  async delete(search, transaction) {
    try {
      const filter = await this.generateQueryFilterFromQueryParams(search);
      const item = await this.model.deleteOne(filter).transaction(transaction);
      if (!item) throw new baseError(`Some error occurred while deleting the ${this.name}.`, 500);
      return item;
    } catch (ex) {
      throw new baseError(ex.message || `Some error occurred while deleting the ${this.name}.`, ex.statusCode || 400);
    }
  }

  async deleteMany(search, transaction) {
    try {
      const filter = await this.generateQueryFilterFromQueryParams(search);
      const count = await this.model.deleteMany(filter).transaction(transaction);
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
        if(field === 'ids'){
          filter.push({
            id : search[field].split(',')
          });
        } else if(Number(search[field])) {
          console.log('HERE');
          filter.push({
            [field] : search[field]
          });
        } else if(search[field].toLowerCase() === "true" || search[field].toLowerCase() === "false") {
          if(search[field].toLowerCase() === "true"){
            filter.push({
              [field] : true
            });
          } else {
            filter.push({
              [field] : false
            });
          }
        } else {
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
