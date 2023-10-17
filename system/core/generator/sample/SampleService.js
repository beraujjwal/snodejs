'use strict';
const autoBind = require( 'auto-bind' );
const { Services } = require( './Services' );



class SERVICE_PLURAL extends Services {



  /**
   * Service constructor
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

module.exports = { SERVICE_PLURAL };
