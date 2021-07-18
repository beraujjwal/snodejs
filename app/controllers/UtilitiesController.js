'use strict';
const { Controller } = require( './Controller' );
const autoBind = require( 'auto-bind' );



class UtilitiesController extends Controller {



  /**
   * Controller constructor
   * @author Ujjwal Bera
   * @param null
   */
  constructor( ) {
      super( );        
      this.Country = this.db.Country;
      this.State = this.db.State;
      this.City = this.db.City;
      autoBind( this );
  }



  /**
   * @desc   Get list of countries
   *
   * @param req : request
   * @param res : response
   * @param next
   * @returns json
   */
  async get_countries( req, res, next ) {
    
      var name = 'name';
      var order = 'name';
      var ordering = 'ASC';
      const query = []

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

      this.Country.scope('activeCountries').findAll({
        where: {          
          [this.Op.and]: query
        },
        include: [
          {  model: this.State, as: 'states' }
        ],
        order: [
          [order, ordering],
        ]        
      })
      .then(datas => {
        if(datas.length) {
          res.status(200).json(this.Response.success("OK", { count: datas.length, datas: datas }, res.statusCode));
        } else {
          res.status(404).json(this.Response.blank("No country found as per your request!", res.statusCode));
        }
      })
      .catch(err => {
          res.status(500).json(this.Response.error(err.message || "Some error occurred while retrieving tutorials.", res.statusCode));
      });
  }



  /**
   * @desc   Get list of states
   *
   * @param req : request
   * @param res : response
   * @param next
   * @returns json
   */
  async get_states( req, res, next ) {
    
      var name = 'name';
      var order = 'name';
      var ordering = 'ASC';
      const query = []

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

      query.push({
        country_id: {
          [this.Op.eq]: req.params.country_id
        }
      })

      this.State.scope('activeStates').findAll({
        where: {          
          [this.Op.and]: query
        },
        include: [
          {  model: this.Country, as: 'country' },
          {  model: this.City, as: 'cities' }
        ],
        order: [
          [order, ordering],
        ]
      })
      .then(datas => {
        if(datas.length) {
          res.status(200).json(this.Response.success("OK", { count: datas.length, datas: datas }, res.statusCode));
        } else {
          res.status(500).json(this.Response.blank("No state found as per your request!", res.statusCode));
        }
      })
      .catch(err => {
          res.status(500).json(this.Response.error(err.message || "Some error occurred while retrieving tutorials.", res.statusCode));
      });
  }



  /**
   * @desc   Get list of cities
   *
   * @param req : request
   * @param res : response
   * @param next
   * @returns json
   */
  async get_cities( req, res, next ) {
    
      var name = 'name';
      var order = 'name';
      var ordering = 'ASC';
      const query = [];

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

      query.push({
        state_id: {
          [this.Op.eq]: req.params.state_id
        }
      })

      this.City.scope('activeCities').findAll({
        where: {          
          [this.Op.and]: query
        },
        include: [
          {  
            model: this.State,
            as: 'state',
            include: [
              {  model: this.Country, as: 'country' }
            ],
          }
          
        ],
        order: [
          [order, ordering],
        ]
      })
      .then(datas => {
        if(datas.length) {
          res.status(200).json(this.Response.success("OK", { count: datas.length, datas: datas }, res.statusCode));
        } else {
          res.status(500).json(this.Response.blank("No city found as per your request!", res.statusCode));
        }
      })
      .catch(err => {
          res.status(500).json(this.Response.error(err.message || "Some error occurred while retrieving tutorials.", res.statusCode));
      });
  }



  async adminStoreAttribute( req, res, next ) {
    this.Country.create({
      code:             req.body.code,
      name:             req.body.name,
      type:             req.body.type,
      validation:       req.body.validation,
      position:         req.body.position,
      is_required:      req.body.is_required,
      is_unique:        req.body.is_unique,
      is_filterable:    req.body.is_filterable,
      is_configurable:  req.body.is_configurable,
      is_visible:       req.body.is_visible,
      is_user_defined:  req.body.is_user_defined,
      is_comparable:    req.body.is_comparable,
      deleted_at:       null,
      status:           true,
    }).then(attribute => {
      res.status(200).send({code: 200, status: true, data: attribute,  message: "Attribute was added successfully!" });
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
  async adminDetailsAttribute( req, res, next ) {
    
      var id = req.params.id;
      console.log(id)
      this.Country.findOne({
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
    var id = req.params.id;
    this.Country.update({
      code:             req.body.code,
      name:             req.body.name,
      type:             req.body.type,
      validation:       req.body.validation,
      position:         req.body.position,
      is_required:      req.body.is_required,
      is_unique:        req.body.is_unique,
      is_filterable:    req.body.is_filterable,
      is_configurable:  req.body.is_configurable,
      is_visible:       req.body.is_visible,
      is_user_defined:  req.body.is_user_defined,
      is_comparable:    req.body.is_comparable,
      deleted_at:       null,
      status:           true,
    }, {
      where: {
        id: id
      }
    }).then(data => {
      res.status(200).send({code: 200, status: true, data: data,  message: "Attribute was updated successfully!" });
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
    
      var id = req.params.id;
      console.log(id)
      this.Country.findOne({
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

module.exports = new UtilitiesController( );