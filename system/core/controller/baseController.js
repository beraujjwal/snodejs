'use strict';
//const autoBind = require('auto-bind');
const { base } = require('../base');

const { baseError } = require('../error/baseError');

class baseController extends base {

  /**
   * @description Base Controller Layer
   * @author Ujjwal Bera<ujjwalbera.dev@gmail.com>
   * @param service
   * @returns null
   */
  constructor(service) {
    super();
    this.service = service;

    //autoBind(this);
  }

  /**
   * @description Fetch list of items with total count
   * @author Ujjwal Bera<ujjwalbera.dev@gmail.com>
   * @param {*} req
   * @param {*} transaction
   * @returns {*} object
   */
  async getAll(req, transaction) {
      const response = await this.service.getAll(req.query, { transaction });
      if (response) {
        return {
          code: 200,
          result: response,
          message: __("ITEMS_LIST_FETCH_SUCESSFULLY")
        }
      }
      throw new baseError(__("ITEMS_LIST_FETCH_ERROR"));
  }

  /**
   * @description Add a new item
   * @author Ujjwal Bera<ujjwalbera.dev@gmail.com>
   * @param {*} req
   * @param {*} transaction
   * @returns {*} object
   */
  async createNew(req, transaction) {
    const response = await this.service.createNew(req.body, { transaction });
    if(response) {
      return {
        code: 200,
        result: response,
        message: __("ITEM_ADDED_SUCESSFULLY")
      }
    }
    throw new baseError(__("ITEM_ADDED_ERROR"));
  }

  /**
   * @description Fetch item details by item id
   * @author Ujjwal Bera<ujjwalbera.dev@gmail.com>
   * @param {*} req
   * @param {*} transaction
   * @returns {*} object
   */
  async getById(req, transaction) {
    const { id } = req.params;
    const response = await this.service.getById(id, transaction);
    if (response) {
      return {
        code: 200,
        result: response,
        message: __("ITEM_DETAIL_FETCH_SUCESSFULLY")
      }
    }
    throw new baseError(__("ITEM_DETAIL_FETCH_ERROR"));
  }

  /**
   * @description Fetch item details
   * @author Ujjwal Bera<ujjwalbera.dev@gmail.com>
   * @param {*} req
   * @param {*} transaction
   * @returns {*} object
   */
  async get(req, transaction) {
    const response = await this.service.get(req.params, transaction);
    if (response) {
      return {
        code: 200,
        result: response,
        message: __("ITEM_DETAIL_FETCH_SUCESSFULLY")
      }
    }
    throw new baseError(__("ITEM_DETAIL_FETCH_ERROR"));
  }

  /**
   * @description Add multiple new items
   * @author Ujjwal Bera<ujjwalbera.dev@gmail.com>
   * @param {*} req
   * @param {*} transaction
   * @returns {*} object
   */
  async addMany(req, transaction) {
    const response = await this.service.addMany(req.body, transaction);
    if(response) {
      return {
        code: 200,
        result: response,
        message: __("ITEMS_ADDED_SUCESSFULLY")
      }
    }
    throw new baseError(__("ITEMS_ADDED_ERROR"));
  }

  /**
   * @description Update item by item id
   * @author Ujjwal Bera<ujjwalbera.dev@gmail.com>
   * @param {*} req
   * @param {*} transaction
   * @returns {*} object
   */
  async updateById(req, transaction) {
    const { id } = req.params;
    const response = await this.service.updateById(id, req.body, transaction);

    if(response) {
      return {
        code: 200,
        result: response,
        message: __("ITEM_UPDATED_SUCESSFULLY")
      }
    }
    throw new baseError(__("ITEM_UPDATED_ERROR"));
  }

  /**
   * @description Update item
   * @author Ujjwal Bera<ujjwalbera.dev@gmail.com>
   * @param {*} req
   * @param {*} transaction
   * @returns {*} object
   */
  async update(req, transaction) {
    const response = await this.service.update(req.params, req.body, transaction);

    if(response) {
      return {
        code: 200,
        result: response,
        message: __("ITEM_UPDATED_SUCESSFULLY")
      }
    }
    throw new baseError(__("ITEM_UPDATED_ERROR"));
  }

  /**
   * @description Delete item by item id
   * @author Ujjwal Bera<ujjwalbera.dev@gmail.com>
   * @param {*} req
   * @param {*} transaction
   * @returns {*} object
   */
  async deleteById(req, transaction) {
    const { id } = req.params;
    const response = await this.service.deleteById(id, transaction);
    if(response) {
      return {
        code: 200,
        result: response,
        message: __("ITEM_DELETED_SUCESSFULLY")
      }
    }
    throw new baseError(__("ITEM_DELETED_ERROR"));
  }

  /**
   * @description Delete item
   * @author Ujjwal Bera<ujjwalbera.dev@gmail.com>
   * @param {*} req
   * @param {*} transaction
   * @returns {*} object
   */
  async delete(req, transaction) {
    const response = await this.service.delete(req.params, transaction);
    if(response) {
      return {
        code: 200,
        result: response,
        message: __("ITEM_DELETED_SUCESSFULLY")
      }
    }
    throw new baseError(__("ITEM_DELETED_ERROR"));
  }


  /**
   * @description Delete items
   * @author Ujjwal Bera<ujjwalbera.dev@gmail.com>
   * @param {*} req
   * @param {*} transaction
   * @returns {*} object
   */
  async deleteMany(req, transaction) {
    const response = await this.service.deleteMany(req.params, transaction);
    if(response) {
      return {
        code: 200,
        result: response,
        message: __("UNABLE_TO_ADD_PERMISSION")
      }
    }
    throw new baseError(__("UNABLE_TO_ADD_PERMISSION"));
  }
}

module.exports = { baseController };
