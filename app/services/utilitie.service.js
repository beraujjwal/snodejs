'use strict';
const { service } = require( './service' );
const autoBind = require( 'auto-bind' );



class Utilities extends service {



  /**
   * Services constructor
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


  /**
   * @desc   Get Language list
   *
   * @param req : request
   * @param res : response
   * @param next
   * @returns {Promise<*>}
   */
  async getLanguages(  ) {

      var langs = {en: 'English', bn: 'Bengali', hi: 'Hindi'};
      return langs;

  }
}

module.exports = { Utilities };