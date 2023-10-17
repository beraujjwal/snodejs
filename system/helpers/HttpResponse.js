'use strict';
class HttpResponse {



    /**
     * Controller Layer
     * @author Ujjwal Bera
     * @param null
     */
    constructor( ) {
        
    }



    /**
    * @desc    Send any success response
    *
    * @param   {string} message
    * @param   {object | array} results
    * @param   {number} statusCode
    */
    success(message, results, statusCode) {
        return {
            message,
            error: false,
            code: statusCode,
            results
        };
    }



    /**
    * @desc    Send success but no data response
    *
    * @param   {string} message
    * @param   {object | array} results
    * @param   {number} statusCode
    */
    blank(message, statusCode) {
        return {
            message,
            error: false,
            code: statusCode
        };
    }



    /**
    * @desc    Send any error response
    *
    * @param   {string} message
    * @param   {number} statusCode
    */
    error(message, statusCode) {
        // List of common HTTP request code
        const codes = [200, 201, 400, 401, 404, 403, 422, 500];

        // Get matched code
        const findCode = codes.find((code) => code == statusCode);

        if (!findCode) statusCode = 500;
        else statusCode = findCode;

        return {
            message,
            code: statusCode,
            error: true
        };
    };



    /**
    * @desc    Send any validation response
    *
    * @param   {object | array} errors
    */
    validation(errors) {
        return {
            message: "Validation errors",
            error: true,
            code: 422,
            errors
        };
    };


}
module.exports = { HttpResponse };