'use strict';
const { Controller } = require( './Controller' );
const autoBind = require( 'auto-bind' );



class PermissionsController extends Controller {



  /**
   * Controller constructor
   * @author Ujjwal Bera
   * @param null
   */
  constructor( ) {
      super( );        
      this.Permission = this.db.Permission;
      this.User = this.db.User;
      this.Role = this.db.Role;
      autoBind( this );
  }


  /**
   * @desc   Get list of attribute for admin user
   *
   * @param req : request
   * @param res : response
   * @param next
   * @returns {Promise<*>}
   */
  async adminPermissions( req, res, next ) {

    let name = 'name';
    let order = 'name';
    let ordering = 'ASC';
    let queries = req.query;
    let offset = 0;
    let limit = 100;
    let query = [];

      if(req.query.limit) {
        limit = req.query.limit
      }

      if(req.query.page) {
        if(req.query.page > 1) {
          offset = req.query.page * limit - limit;
        }
      }

      if(req.query.orderby) {
        order = req.query.orderby
      }

      if(req.query.ordering) {
        ordering = req.query.ordering
      }

      if(req.query.keyword) {
        query.push({
          [name]: {
            [this.Op.iLike]: `%${req.query.keyword}%`
          }
        })
      }

      this.Permission.findAll({
        /*where: {          
          [this.Op.and]: query
        },*/
        include: [
          {  
            model: this.User, 
            as: 'user_permissions',
            include: [
              {
                model: this.Role,
                as: 'roles',
                required: false,
              }
            ]
          },
          {  model: this.Role, as: 'role_permissions' }
        ],
        order: [
          [order, ordering],
        ],
        offset: offset, limit: limit,
      })
      .then(datas => {
        if(datas.length) {
          res.status(200).json(this.Response.success("OK", { count: datas.length, datas: datas }, res.statusCode));
        } else {
          res.status(500).json(this.Response.error("Permission Not found.", res.statusCode));
        }
      })
      .catch(err => {
          res.status(500).json(this.Response.error(err.message || "Some error occurred while retrieving tutorials.", res.statusCode));
      });
  }



  async adminStorePermission( req, res, next ) {
    console.log(req.user.phone);
    this.Permission.create({
      name:             req.body.name,
      slug:             req.body.slug,
      deleted_at:       null,
      status:           true,
      created_by:       req.user.id
    }).then(data => {
      res.status(200).send({code: 200, status: true, data: data,  message: "Permission was added successfully!" });
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
   * @returns json
   */
  async adminDetailsPermission( req, res, next ) {
    
    let id = req.params.id;
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



  async adminUpdatePermission( req, res, next ) {
    let id = req.params.id;
    this.Permission.update({
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
    }).then(data => {
      res.status(200).send({code: 200, status: true, data: data,  message: "Permission was updated successfully!" });
    }).catch(err => {
      res.status(500).json(this.Response.error(err.message, res.statusCode));
    });
  }


  /**
   * @desc   Get Permission for for admin user
   *
   * @param req : request
   * @param res : response
   * @param next
   * @returns {Promise<*>}
   */
  async adminDeletePermission( req, res, next ) {
    
    let id = req.params.id;
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

module.exports = new PermissionsController( );