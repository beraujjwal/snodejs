'use strict';
const { controller } = require( './controller' );
const { role } = require('../services/role.service');

const roleService = new role('Role');



class RolesController extends controller {



  /**
   * Controller constructor
   * @author Ujjwal Bera
   * @param null
   */
  constructor( ) {
      super( );
      this.Role = this.db.Role;
      this.RoleTranslation = this.db.RoleTranslation;
      this.RolePermission = this.db.RolePermission;
  }


  /**
   * @desc   Get list of attribute for admin user
   *
   * @param req : request
   * @param res : response
   * @param next
   * @returns {Promise<*>}
   */
  async getAll( req, transaction ) {
    const result = await roleService.getAll(req.query, transaction);
    if (result === undefined || result === null) throw new baseError(__("ROLES_LIST_FETCH_ERROR"));
    return {
      code: 200,
      result,
      message: "ROLES_LIST_FETCH_SUCESSFULLY"
    }
  }



  async create( req, transaction ) {
    const { name, parentId } = req.body;
    const result = await roleService.create({ name, parentId }, transaction);
    if (result === undefined || result === null) throw new baseError(__("UNABLE_TO_ADD_NEW_ROLE"));
    return {
      code: 200,
      result,
      message: "ROLE_ADDED_SUCESSFULLY"
    }
  }


  /**
   * @desc   Get attribute for for admin user
   *
   * @param req : request
   * @param res : response
   * @param next
   * @returns {Promise<*>}
   */
  async adminDetailsRole( req, res, next ) {

      var id = req.params.id;
      console.log(id)
      this.Role.findOne({
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
          res.status(500).json(this.Response.error("Role Not found.", res.statusCode));
        }
      })
      .catch(err => {
          res.status(500).json(this.Response.error(err.message || "Some error occurred while retrieving tutorials.", res.statusCode));
      });
  }



  async adminUpdateRole( req, res, next ) {
    var id = req.params.id;
    this.Role.update({
      code:             req.body.code,
      name:             req.body.name,
      type:             req.body.type,
      validation:       req.body.validation,
      position:         req.body.position,
      is_required:      req.body.required,
      is_unique:        req.body.unique,
      is_filterable:    req.body.filterable,
      is_configurable:  req.body.configurable,
      is_visible:       req.body.visible,
      is_user_defined:  req.body.user_defined,
      is_comparable:    req.body.comparable,
      deleted_at:       null,
      status:           true,
    }, {
      where: {
        id: id
      }
    }).then(attribute => {
      res.status(200).send({code: 200, status: true, data: attribute,  message: "Role was updated successfully!" });
    }).catch(err => {
      res.status(500).json(this.Response.error(err.message, res.statusCode));
    });
  }


  /**
   * @desc   Get attribute for for admin user
   *
   * @param req : request
   * @param res : response
   * @param next
   * @returns {Promise<*>}
   */
  async adminDeleteRole( req, res, next ) {

      var id = req.params.id;
      console.log(id)
      this.Role.findOne({
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
          res.status(500).json(this.Response.error("Role Not found.", res.statusCode));
        }
      })
      .catch(err => {
          res.status(500).json(this.Response.error(err.message || "Some error occurred while retrieving tutorials.", res.statusCode));
      });
  }


  /**
   * @description Delete role by primary key
   * @author Ujjwal Bera<ujjwalbera.dev@gmail.com>
   * @param req : request
   * @param transaction : transaction
   * @returns {*}
   */
  async deleteByPk( req, transaction ) {

    const id = req.params.id;

    console.log('this.service', this.service);

    const result = await roleService.deleteByPk(id, transaction );
    if (!result) throw new baseError(__("UNABLE_TO_UPDATE_PERMISSION"));
    return {
      code: 200,
      result,
      message: "PERMISSION_UPDATED_SUCESSFULLY"
    }
  }
}

module.exports = new RolesController( );