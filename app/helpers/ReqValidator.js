'use strict';
var Validator = require('validatorjs');
class ReqValidator  {



    /**
     * Controller Layer
     * @author Ujjwal Bera
     * @param null
     */
    constructor( ) {
        
    }


    /**
    * @desc    validator function   
    *
    * @param   {object} body
    * @param   {object} rules
    * @param   {object | array} customMessages
    * @param   {string} callback
    */
    fromValidator(body, rules, customMessages, callback) {
        const validation = new Validator(body, rules, customMessages);
        validation.passes(() => callback(null, true));
        validation.fails(() => callback(validation.errors, false));
    }


}
module.exports = { ReqValidator };