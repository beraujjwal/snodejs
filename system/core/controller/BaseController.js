'use strict';
const autoBind = require( 'auto-bind' );
const db = require("../model");
require( 'dotenv' ).config();
//const { LocaleService } = require( '../services/localeService' );
//const { i18n } = require( '../../../config/i18n' );

//const i18n = require('i18n');

class BaseController {



    /**
     * Base Controller Layer
     * @author Ujjwal Bera
     * @param null
     */
    constructor( ) {
        this.db = db;
        this.Op = db.Sequelize.Op;
        this.env = process.env;
        autoBind( this );
    }

}

module.exports = { BaseController };
