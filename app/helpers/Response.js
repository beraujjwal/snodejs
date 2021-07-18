'use strict';
const autoBind = require( 'auto-bind' );
const { HttpResponse } = require("../../system/helpers/HttpResponse");
class Response extends HttpResponse {



    /**
     * Controller Layer
     * @author Ujjwal Bera
     * @param null
     */
    constructor( ) {
        super( );
        autoBind( this );
    }


}
module.exports = { Response };