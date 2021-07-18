'use strict';
const autoBind = require( 'auto-bind' );
require( 'dotenv' ).config();
const db = require("../core/model");
const { HttpResponse } = require("../helpers/HttpResponse");

class BaseMiddleware {



    /**
     * Base Middleware Layer
     * @author Ujjwal Bera
     * @param null
     */
    constructor( ) {
        this.db = db;
        this.Op = db.Sequelize.Op;
        this.env = process.env;
        this.HttpResponse = new HttpResponse();
        this.lang =  getLocale();
        autoBind( this );
    }

}

module.exports = { BaseMiddleware };
