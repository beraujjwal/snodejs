'use strict';
const jwt = require("jsonwebtoken");
const autoBind = require( 'auto-bind' );
const { BaseMiddleware } = require("../../system/middleware/BaseMiddleware");
const { ReqValidator } = require('../helpers/ReqValidator');

class Middleware extends BaseMiddleware {



    /**
     * Controller constructor
     * @author Ujjwal Bera
     * @param null
     */
    constructor( ) {
        super( );
        this.ReqValidator = new ReqValidator();
        autoBind( this );
    }

}

module.exports = { Middleware };
