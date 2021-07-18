'use strict';
const autoBind = require( 'auto-bind' );
const { BaseController } = require("../../system/core/controller/BaseController");
const { Response } = require("../helpers/Response");
let mailer =  require('../../config/mailer');
let crypto = require('crypto');
class Controller extends BaseController {



    /**
     * Controller constructor
     * @author Ujjwal Bera
     * @param null
     */
    constructor( ) {
        super( );
        this.mailer = mailer;
        this.crypto = crypto;
        this.Response = new Response();
        autoBind( this );
    }


    async isUnique(model, key, value, id=null) {
      const query = [];

      value = value.toLowerCase();
      value = value.replace(/[^a-zA-Z ]/g, "");
      value = value.replace(/[^a-zA-Z]/g, "-");

      if(value) {
        query.push({
          [key]: {
            [this.Op.eq]: value
          }
        })
      }

      if(id != null) {
        query.push({
          id: {
            [this.Op.ne]: id
          }
        })
      }

      return model.findOne({
        where: {          
          [this.Op.and]: query
        }
      });
    }

}

module.exports = { Controller };
