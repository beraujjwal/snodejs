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
    if (result) {
      return {
        code: 200,
        result,
        message: "PERMISSIONS_LIST_FETCH_SUCESSFULLY"
      }
    }
    throw new baseError(__("PERMISSIONS_LIST_FETCH_ERROR"));
  }


  /**
   * @description Fetch list of permissions
   * @author Ujjwal Bera<ujjwalbera.dev@gmail.com>
   * @param req : request
   * @param transaction : transaction
   * @returns {*}
   */
  async createNew( req, transaction ) {

    const result = await this.service.createNew({ ...req.body }, { transaction } );
    if (result) {
      return {
        code: 201,
        result,
        message: "PERMISSION_ADDED_SUCESSFULLY"
      }
    }
    throw new baseError(__("UNABLE_TO_ADD_PERMISSION"));
  }


  /**
   * @description Fetch list of permissions
   * @author Ujjwal Bera<ujjwalbera.dev@gmail.com>
   * @param req : request
   * @param transaction : transaction
   * @returns {*}
   */
  async findByPk( req, transaction ) {

    const id = req.params.id;
    const result = await this.service.findByPk(id, { transaction });

    if (result) {
      return {
        code: 200,
        result,
        message: "PERMISSION_DEATILS_FETCHED_SUCESSFULLY"
      }
    }
    throw new baseError(__("UNABLE_TO_FETCH_PERMISSION"));
  }


  /**
   * @description Fetch list of permissions
   * @author Ujjwal Bera<ujjwalbera.dev@gmail.com>
   * @param req : request
   * @param transaction : transaction
   * @returns {*}
   */
  async updateByPk( req, transaction ) {
    const id = req.params.id;
    const result = await this.service.updateByPk(id, { ...req.body }, { transaction });
    if (result) {
      return {
        code: 200,
        result,
        message: "PERMISSION_UPDATED_SUCESSFULLY"
      }
    }
    throw new baseError(__("UNABLE_TO_UPDATE_PERMISSION"));
  }


  /**
   * @description Fetch list of permissions
   * @author Ujjwal Bera<ujjwalbera.dev@gmail.com>
   * @param req : request
   * @param transaction : transaction
   * @returns {*}
   */
  async adminDeletePermission( req, res, next ) {

      var id = req.params.id;
      console.log(id)
      this.Permission.findOne({
        where: {
          [this.Op.and]: [
            {
              id: {
                [this.Op.eq]: id
              }
            },
            {
              deleted_at: {
                [this.Op.eq]: null
              }
            }
          ]
        }
      })
      .then(data => {
        if(data) {
          res.status(200).json(this.Response.success("OK", { data: data }, res.statusCode));
        } else {
          res.status(500).json(this.Response.error("Permission Not found.", res.statusCode));
        }
      })
      .catch(err => {
          res.status(500).json(this.Response.error(err.message || "Some error occurred while retrieving tutorials.", res.statusCode));
      });
  }
}

module.exports = new PermissionsController( permissionService );