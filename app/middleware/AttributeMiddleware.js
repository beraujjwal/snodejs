'use strict';
const jwt = require("jsonwebtoken");
const autoBind = require( 'auto-bind' );
const { Middleware } = require( './Middleware' );

class AttributeMiddleware extends Middleware {


  /**
   * Controller constructor
   * @author Ujjwal Bera
   * @param null
   */
  constructor( ) {
      super( );        
      this.User = this.db.User;
      autoBind( this );
  }

}

module.exports = new AttributeMiddleware( );