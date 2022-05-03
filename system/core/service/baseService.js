'use strict';
const autoBind = require('auto-bind');
const { parseInt } = require('lodash');
const { base } = require('../base');

const { log, error, info } = require('../helpers/errorLogs');

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
    this.log = log;
    this.errorLog = error;
    this.infoLog = info;
    autoBind(this);
  }

  async getAll(
    {
      orderby = 'id',
      order = 'DESC',
      limit = this.dataPerPage,
      page = 1,
      ...search
    },
    filter = null,
	include = null
  ) {
    try {

		if(page) {
			if(page > 1) {
			  offset = page * limit - limit;
			  page = page;
			}
		}


    	if (filter === null) {
			for (const field in search) {
				let filterValue;
				if (typeof search[field] === 'number') {
					filterValue = parseInt(search[field]);
				} else if (typeof search[field] === 'string') {
					filterValue = new RegExp(search[field], 'i');
				} else if (typeof search[field] === 'boolean') {
					filterValue = parseInt(search[field]);
				} else {
					filterValue = search[field];
				}
				query.push({
					[this.Op.and]: {
						[field]: {
						[this.Op.eq]: filterValue
						}
					}
				});
			}
		}

		const items = await this.model.findAll({
			where: {
			  [this.Op.and]: query
			},
			include: [include],
			order: [
				[orderby, order],
			],
			offset: offset, limit: limit,
		});
		const total = await this.model.count({
			where: {
			  [this.Op.and]: query
			},
			include: [include],
		});

    	return { items, totalCount: total };
    } catch (ex) {
		let error = new Error(ex.message);
		error.statusCode = 400;
		throw error;
    }
  }

  async get(id) {
    try {
		const item = await this.model.findOne({
			where: {
				id: id
			}
		});
		if (item) {
			return item;
		}
		throw new Error(`This ${this.name} not found.`);
    } catch (ex) {
		let error = new Error(ex.message);
		error.statusCode = 400;
		throw error;
    }
  }

  async get(id) {
    try {
		const item = await this.model.findOne({
			where: {
				id: id
			}
		});
		if (item) {
			return item;
		}
		throw new Error(`This ${this.name} not found.`);
    } catch (ex) {
		let error = new Error(ex.message);
		error.statusCode = 400;
		throw error;
    }
  }

  async create(data) {
    try {
      Object.keys(data).forEach(
        (key) => data[key] === undefined && delete data[key],
      );
      const item = await this.model.create(data);

      if (item) {
        return item;
      }
      throw new Error(`Unable to create this ${this.name}.`);
    } catch (ex) {
      let error = new Error(ex.message);
      error.statusCode = ex.statusCode;
      throw error;
    }
  }

  async updateById(id, data) {
    try {
      Object.keys(data).forEach(
        (key) => data[key] === undefined && delete data[key],
      );

      const item = await this.model.findByIdAndUpdate(id, data, { new: true });

      if (item) {
        return item;
      }
      throw new Error(`Unable to update this ${this.name}.`);
    } catch (ex) {
      let error = new Error(ex.message);
      error.statusCode = ex.statusCode;
      throw error;
    }
  }

  async update(filter, data) {
    try {
      Object.keys(data).forEach(
        (key) => data[key] === undefined && delete data[key],
      );
      const item = await this.model.findByIdAndUpdate(filter, data, {
        new: true,
      });

      if (item) {
        return item;
      }
      throw new Error(`Unable to update this ${this.name}.`);
    } catch (ex) {
      let error = new Error(ex.message);
      error.statusCode = ex.statusCode;
      throw error;
    }
  }

  async deleteById(id) {
    try {
      let data = { deleted: true, deletedAt: new Date() };
      const item = await this.model.findByIdAndUpdate(id, data, { new: true });

      if (item) {
        return item;
      }
      throw new Error(`Unable to update this ${this.name}.`);
    } catch (ex) {
      let error = new Error(ex.message);
      error.statusCode = ex.statusCode;
      throw error;
    }
  }

  async delete(filter) {
    try {
      let data = { deleted: true, deletedAt: new Date() };
      const item = await this.model.findByIdAndUpdate(filter, data, {
        new: true,
      });

      if (item) {
        return item;
      }
      throw new Error('Something wrong happened');
    } catch (ex) {
      let error = new Error(ex.message);
      error.statusCode = ex.statusCode;
      throw error;
    }
  }
}

module.exports = { baseService };
