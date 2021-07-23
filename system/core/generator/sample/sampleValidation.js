'use strict';
const autoBind = require( 'auto-bind' );
const validator = require( './validate' );
const { Middleware } = require( '../middleware/Middleware' );


class VALIDATION_SINGULAR_VALIDATION extends Middleware {


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
  
    

    
   /**
    * Sample Validation method
    */

   /**
    * 
    async sampleValidation(req, res, next) {

        sampleRule = {};
        
        validator(req.body, sampleRule, {}, (err, status) => {
            if (!status) {
                res.status(412)
                    .send({
                        success: false,
                        message: 'Validation failed',
                        data: err
                    });
            } else {
                next();
            }
        });        
    }
    * 
    */

}

module.exports = new VALIDATION_SINGULAR_VALIDATION( );