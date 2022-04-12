'use strict';
const { Controller } = require( './Controller' );
const autoBind = require( 'auto-bind' );



class CONTROLLER_PLURAL_FORMController extends Controller {



  /**
   * Controller constructor
   * @author Ujjwal Bera
   * @param null
   */
  constructor( ) {
      super( );
      /*
      	add your line here
      */
      autoBind( this );
  }
  
  /*
    add your mehods here
  */

}

module.exports = new CONTROLLER_PLURAL_FORMController( );
