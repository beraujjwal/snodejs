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
  }

  /**
   * @description Fetch list of items with total count
   * @author Ujjwal Bera<ujjwalbera.dev@gmail.com>
   * @param {*} req
   * @param {*} transaction
   * @returns {*} object
   */
  async list(req, transaction) {
      const response = await this.service.list(req.query, { transaction });
      if (!response) throw new baseError(__("ITEMS_LIST_FETCH_ERROR"));
      return {
        code: 200,
        result: response,
        message: __("ITEMS_LIST_FETCH_SUCESSFULLY")
      }
  }


  /**
   * @description Read item details
   * @author Ujjwal Bera<ujjwalbera.dev@gmail.com>
   * @param {*} req
   * @param {*} transaction
   * @returns {*} object
   */
  async read(req, transaction) {
    const response = await this.service.read(req.params, transaction);
    if (!response) throw new baseError(__("ITEM_DETAIL_FETCH_ERROR"));
    return {
      code: 200,
      result: response,
      message: __("ITEM_DETAIL_FETCH_SUCESSFULLY")
    }
  }


  /**
   * @description Read item details by item id
   * @author Ujjwal Bera<ujjwalbera.dev@gmail.com>
   * @param {*} req
   * @param {*} transaction
   * @returns {*} object
   */
  async readById(req, transaction) {
    const { id } = req.params;
    const response = await this.service.readById(id, transaction);
    if (!response) throw new baseError(__("ITEM_DETAIL_FETCH_ERROR"));
    return {
      code: 200,
      result: response,
      message: __("ITEM_DETAIL_FETCH_SUCESSFULLY")
    }
  }


  /**
   * @description Add a new item
   * @author Ujjwal Bera<ujjwalbera.dev@gmail.com>
   * @param {*} req
   * @param {*} transaction
   * @returns {*} object
   */
  async add(req, transaction) {
    const response = await this.service.add(req.body, transaction);
    if(!response) throw new baseError(__("ITEM_ADDED_ERROR"));
    return {
      code: 200,
      result: response,
      message: __("ITEM_ADDED_SUCESSFULLY")
    }
  }


  /**
   * @description Add multiple new items
   * @author Ujjwal Bera<ujjwalbera.dev@gmail.com>
   * @param {*} req
   * @param {*} transaction
   * @returns {*} object
   */
  async addMany(req, transaction) {
    const response = await this.service.addMany(req.body, { transaction });
    if(!response) throw new baseError(__("ITEMS_ADDED_ERROR"));
    return {
      code: 200,
      result: response,
      message: __("ITEMS_ADDED_SUCESSFULLY")
    }
  }


  /**
   * @description Edit item
   * @author Ujjwal Bera<ujjwalbera.dev@gmail.com>
   * @param {*} req
   * @param {*} transaction
   * @returns {*} object
   */
  async edit(req, transaction) {
    const response = await this.service.edit(req.params, req.body, transaction);
    if(!response) throw new baseError(__("ITEM_UPDATED_ERROR"));
    return {
      code: 200,
      result: response,
      message: __("ITEM_UPDATED_SUCESSFULLY")
    }
  }


  /**
   * @description Edit item by item id
   * @author Ujjwal Bera<ujjwalbera.dev@gmail.com>
   * @param {*} req
   * @param {*} transaction
   * @returns {*} object
   */
  async editById(req, transaction) {
    const { id } = req.params;
    const response = await this.service.editById(id, req.body, transaction);
    if(!response) throw new baseError(__("ITEM_UPDATED_ERROR"));
    return {
      code: 200,
      result: response,
      message: __("ITEM_UPDATED_SUCESSFULLY")
    }
  }


  /**
   * @description Edit multiple items by item id
   * @author Ujjwal Bera<ujjwalbera.dev@gmail.com>
   * @param {*} req
   * @param {*} transaction
   * @returns {*} object
   */
  async editMany(req, session) {
    const response = await this.service.editMany(req.params, req.body, session);
    if(!response) throw new baseError(__("UNABLE_TO_UPDATED_ITEMS"));
    return {
      code: 200,
      result: response,
      message: __("ITEMS_UPDATED_SUCESSFULLY")
    }
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
    if(!response) throw new baseError(__("ITEM_DELETED_ERROR"));
    return {
      code: 200,
      result: response,
      message: __("ITEM_DELETED_SUCESSFULLY")
    }
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
    if(!response) throw new baseError(__("UNABLE_TO_DELETE_ITEM"));
    return {
      code: 200,
      result: response,
      message: __("ITEM_DELETED_SUCESSFULLY")
    }
  }


  /**
   * @description Delete multiple items
   * @author Ujjwal Bera<ujjwalbera.dev@gmail.com>
   * @param {*} req
   * @param {*} transaction
   * @returns {*} object
   */
  async deleteMany(req, transaction) {
    const response = await this.service.deleteMany(req.params, transaction);
    if(!response) throw new baseError(__("UNABLE_TO_DELETE_ITEMS"));
    return {
      code: 200,
      result: response,
      message: __("ITEMS_DELETED_SUCESSFULLY")
    }
  }
}

module.exports = { baseController };
