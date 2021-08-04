'use strict';
const { Services } = require( './Services' );
const autoBind = require( 'auto-bind' );



class Attributes extends Services {



  /**
   * Controller constructor
   * @author Ujjwal Bera
   * @param null
   */
  constructor( ) {
      super( );        
      this.Attribute = this.db.Attribute;
      this.AttributeOption = this.db.AttributeOption;
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
  async adminAttributes( req, res, next ) {

      let name = 'name';
      let order = 'name';
      let ordering = 'ASC';
      let queries = req.query;
      let offset = 0;
      let limit = 15;
      let page = 1;
      const query = [];
      try {
        if(req.query.limit) {
          limit = req.query.limit
        }

        if(req.query.page) {
          if(req.query.page > 1) {
            offset = req.query.page * limit - limit;
            page = req.query.page;
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

        if(req.query.required) {
          query.push({
            is_required: {
              [this.Op.eq]: `${req.query.required}`
            }
          })
        }

        if(req.query.unique) {
          query.push({
            is_unique: {
              [this.Op.eq]: `${req.query.unique}`
            }
          })
        }

        if(req.query.filterable) {
          query.push({
            is_filterable: {
              [this.Op.eq]: `${req.query.filterable}`
            }
          })
        }

        if(req.query.visible) {
          query.push({
            is_visible: {
              [this.Op.eq]: `${req.query.visible}`
            }
          })
        }

        if(req.query.user_defined) {
          query.push({
            is_user_defined: {
              [this.Op.eq]: `${req.query.user_defined}`
            }
          })
        }

        let attributes = await this.Attribute.findAll({
          where: {          
            [this.Op.and]: query
          },
          /*include: [
            {  model: this.AttributeOption, as: 'options' }
          ],*/
          order: [
            [order, ordering],
          ],
          offset: offset, limit: limit,
        });
        let total = await this.Attribute.count({
          where: {          
            [this.Op.and]: query
          }
        });

        let result = { attributes: attributes, total: total, limit: limit, page: page, pages: Math.ceil(total/limit), offset:offset }
        
        return result;
      } catch (ex) {
        throw new Error(ex);
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
  async adminAttributeDetails( req, res, next ) {
    
    try {
      let id = req.params.id;      
      let attribute = await this.Attribute.findOne({
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
      });
      return attribute;

    } catch (ex) {
      throw new Error(ex);
    }
  }



  async adminStoreAttribute( req, res, next ) {
    try {
      let attribute = await this.Attribute.create({
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
        is_user_defined:  true,
        is_comparable:    req.body.comparable,
        deleted_at:       null,
        status:           true,
        created_by:       req.user.id,
      });
      return attribute;

    } catch (ex) {
      throw new Error(ex);
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
  async adminDetailsAttribute( req, res, next ) {
    
    let id = req.params.id;
      console.log(id)
      this.Attribute.findOne({
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
          res.status(500).json(this.Response.error("Attributes Not found.", res.statusCode));
        }
      })
      .catch(err => {
          res.status(500).json(this.Response.error(err.message || "Some error occurred while retrieving tutorials.", res.statusCode));
      });
  }



  async adminUpdateAttribute( req, res, next ) {
    let id = req.params.id;
    this.Attribute.update({
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
      res.status(200).send({code: 200, status: true, data: attribute,  message: "Attribute was updated successfully!" });
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
  async adminDeleteAttribute( req, res, next ) {
    
    let id = req.params.id;
      console.log(id)
      this.Attribute.findOne({
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
          res.status(500).json(this.Response.error("Attributes Not found.", res.statusCode));
        }
      })
      .catch(err => {
          res.status(500).json(this.Response.error(err.message || "Some error occurred while retrieving tutorials.", res.statusCode));
      });
  }
}

module.exports = { Attributes };