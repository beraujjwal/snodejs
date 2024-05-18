const { base } = require("../base");
const { baseError } = require("../error/baseError");

class baseController extends base {
  static service = null;

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
  async findAll(req, transaction) {
    const response = await this.service.findAll(req.query, { transaction });
    if (!response) throw new baseError(__("ITEMS_LIST_FETCH_ERROR"));
    return {
      code: 200,
      result: response,
      message: __("ITEMS_LIST_FETCH_SUCESSFULLY"),
    };
  }

  /**
   * @description Read item details
   * @author Ujjwal Bera<ujjwalbera.dev@gmail.com>
   * @param {*} req
   * @param {*} transaction
   * @returns {*} object
   */
  async findOne(req, transaction) {
    const response = await this.service.findOne(req.params, transaction);
    if (!response) throw new baseError(__("ITEM_DETAIL_FETCH_ERROR"));
    return {
      code: 200,
      result: response,
      message: __("ITEM_DETAIL_FETCH_SUCESSFULLY"),
    };
  }

  /**
   * @description Read item details by item id
   * @author Ujjwal Bera<ujjwalbera.dev@gmail.com>
   * @param {*} req
   * @param {*} transaction
   * @returns {*} object
   */
  async findByPk(req, transaction) {
    const { id } = req.params;
    const response = await this.service.findByPk(id, transaction);
    if (!response) throw new baseError(__("ITEM_DETAIL_FETCH_ERROR"));
    return {
      code: 200,
      result: response,
      message: __("ITEM_DETAIL_FETCH_SUCESSFULLY"),
    };
  }

  /**
   * @description Add a new item
   * @author Ujjwal Bera<ujjwalbera.dev@gmail.com>
   * @param {*} req
   * @param {*} transaction
   * @returns {*} object
   */
  async create(req, transaction) {
    console.log("req.body", req.body);
    const response = await this.service.create(req.body, transaction);
    if (!response) throw new baseError(__("ITEM_ADDED_ERROR"));
    return {
      code: 201,
      result: response,
      message: __("ITEM_ADDED_SUCESSFULLY"),
    };
  }

  /**
   * @description Add multiple new items
   * @author Ujjwal Bera<ujjwalbera.dev@gmail.com>
   * @param {*} req
   * @param {*} transaction
   * @returns {*} object
   */
  async bulkCreate(req, transaction) {
    const response = await this.service.bulkCreate(req.body, { transaction });
    if (!response) throw new baseError(__("ITEMS_ADDED_ERROR"));
    return {
      code: 201,
      result: response,
      message: __("ITEMS_ADDED_SUCESSFULLY"),
    };
  }

  /**
   * @description Edit item
   * @author Ujjwal Bera<ujjwalbera.dev@gmail.com>
   * @param {*} req
   * @param {*} transaction
   * @returns {*} object
   */
  async update(req, transaction) {
    const response = await this.service.update(
      req.params,
      req.body,
      transaction
    );
    if (!response) throw new baseError(__("ITEM_UPDATED_ERROR"));
    return {
      code: 200,
      result: response,
      message: __("ITEM_UPDATED_SUCESSFULLY"),
    };
  }

  /**
   * @description Edit item by item id
   * @author Ujjwal Bera<ujjwalbera.dev@gmail.com>
   * @param {*} req
   * @param {*} transaction
   * @returns {*} object
   */
  async updateByPk(req, transaction) {
    const { id } = req.params;
    const response = await this.service.updateByPk(id, req.body, transaction);
    if (!response) throw new baseError(__("ITEM_UPDATED_ERROR"));
    return {
      code: 200,
      result: response,
      message: __("ITEM_UPDATED_SUCESSFULLY"),
    };
  }

  /**
   * @description Edit multiple items by item id
   * @author Ujjwal Bera<ujjwalbera.dev@gmail.com>
   * @param {*} req
   * @param {*} transaction
   * @returns {*} object
   */
  async bulkUpdate(req, session) {
    const response = await this.service.bulkUpdate(
      req.params,
      req.body,
      session
    );
    if (!response) throw new baseError(__("UNABLE_TO_UPDATED_ITEMS"));
    return {
      code: 200,
      result: response,
      message: __("ITEMS_UPDATED_SUCESSFULLY"),
    };
  }

  /**
   * @description Delete item
   * @author Ujjwal Bera<ujjwalbera.dev@gmail.com>
   * @param {*} req
   * @param {*} transaction
   * @returns {*} object
   */
  async destroy(req, transaction) {
    const response = await this.service.destroy(req.params, transaction);
    if (!response) throw new baseError(__("ITEM_DELETED_ERROR"));
    return {
      code: 200,
      result: response,
      message: __("ITEM_DELETED_SUCESSFULLY"),
    };
  }

  /**
   * @description Delete item by item id
   * @author Ujjwal Bera<ujjwalbera.dev@gmail.com>
   * @param {*} req
   * @param {*} transaction
   * @returns {*} object
   */
  async destroyByPk(req, transaction) {
    const { id } = req.params;
    const response = await this.service.destroyByPk(id, transaction);
    if (!response) throw new baseError(__("UNABLE_TO_DELETE_ITEM"));
    return {
      code: 200,
      result: response,
      message: __("ITEM_DELETED_SUCESSFULLY"),
    };
  }
}

module.exports = { baseController };
