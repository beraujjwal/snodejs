'use strict';
const { controller } = require( './controller' );
const { permission } = require('../services/permission.service');
const { baseError } = require('../../system/core/error/baseError');
const permissionService = new permission('Permission');

class PermissionsController extends controller {



  /**
   * Controller constructor
   * @author Ujjwal Bera
   * @param null
   */
  constructor( service ) {
      super( service );
      this.service = service;
  }


  /**
   * @description Fetch list of permissions
   * @author Ujjwal Bera<ujjwalbera.dev@gmail.com>
   * @param req : request
   * @param transaction : transaction
   * @returns {*}
   */
  async getAll( req, transaction ) {

    const result = await this.service.getAll(req.query, { transaction });
    if (result === undefined || result === null) throw new baseError(__("PERMISSIONS_LIST_FETCH_ERROR"));
    return {
      code: 200,
      result,
      message: "PERMISSIONS_LIST_FETCH_SUCESSFULLY"
    }
  }


  /**
   * @description Create a new permission
   * @author Ujjwal Bera<ujjwalbera.dev@gmail.com>
   * @param req : request
   * @param transaction : transaction
   * @returns {*}
   */
  async create( req, transaction ) {
    const { name } = req.body;
    const result = await this.service.create({ name }, { transaction } );
    if (result === undefined || result === null) throw new baseError(__("UNABLE_TO_ADD_PERMISSION"));
    return {
      code: 201,
      result,
      message: "PERMISSION_ADDED_SUCESSFULLY"
    }
  }


  /**
   * @description Fetch permission details by primary key
   * @author Ujjwal Bera<ujjwalbera.dev@gmail.com>
   * @param req : request
   * @param transaction : transaction
   * @returns {*}
   */
  async findByPk( req, transaction ) {
    const id = req.params.id;
    const result = await this.service.findByPk(id, { transaction });
    if (result === undefined || result === null) throw new baseError(__("UNABLE_TO_FETCH_PERMISSION"));
    return {
      code: 200,
      result,
      message: "PERMISSION_DEATILS_FETCHED_SUCESSFULLY"
    }
  }


  /**
   * @description Update permission details by primary key
   * @author Ujjwal Bera<ujjwalbera.dev@gmail.com>
   * @param req : request
   * @param transaction : transaction
   * @returns {*}
   */
  async updateByPk( req, transaction ) {
    const id = req.params.id;
    const { name, status } = req.body;
    const result = await this.service.updateByPk(id, { name, status }, { transaction });
    if (result === undefined || result === null) throw new baseError(__("UNABLE_TO_UPDATE_PERMISSION"));
    return {
      code: 200,
      result,
      message: "PERMISSION_UPDATED_SUCESSFULLY"
    }
  }


  /**
   * @description Delete permission by primary key
   * @author Ujjwal Bera<ujjwalbera.dev@gmail.com>
   * @param req : request
   * @param transaction : transaction
   * @returns {*}
   */
  async deleteByPk( req, res, next ) {

    const id = req.params.id;
    const result = await this.service.deleteByPk(id, { ...req.body }, { transaction });
    if (result === undefined || result === null) throw new baseError(__("UNABLE_TO_UPDATE_PERMISSION"));
    return {
      code: 200,
      result,
      message: "PERMISSION_UPDATED_SUCESSFULLY"
    }
  }
}

module.exports = new PermissionsController( permissionService );