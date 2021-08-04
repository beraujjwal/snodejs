'use strict';
const autoBind = require( 'auto-bind' );
const validator = require( './validate' );
const { Middleware } = require( '../middleware/Middleware' );


class attributeValidation extends Middleware {


    /**
     * Controller constructor
     * @author Ujjwal Bera
     * @param null
     */
    constructor( ) {
        super( );        
        this.Attribute = this.db.Attribute;      
        
        autoBind( this );
    }



    async attributeStoreValidation(req, res, next) {

        this.attributeRule = {
            "name":         'required|string',
            "code":         'required|unique:Attribute,code',        
            "type":         'required',
            "position":     'required|numeric',
            "required":     'required',
            "unique":       'required',
            "filterable":   'required',
            "configurable": 'required',
            "visible":      'required',
            "comparable":   'required',
            "status":       'required'
        }
        
        validator(req.body, this.attributeRule, {}, (err, status) => {
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



    async attributeWebStoreValidation(req, res, next) {

        this.attributeRule = {
            "name":         'required|string',
            "code":         'required|unique:Attribute,code',        
            "type":         'required',
            "position":     'required|numeric',
            "required":     'required',
            "unique":       'required',
            "filterable":   'required',
            "configurable": 'required',
            "visible":      'required',
            "comparable":   'required',
            "status":       'required'
        }

        validator(req.body, this.attributeRule, {}, (err, status) => {
            if (!status) {
                let data = err
                req.flash('validation', data)
                res.redirect('/admin/attribute/add')
            } else {
                next();
            }
        });        
    }



    async attributeWebUpdateValidation(req, res, next) {
        let id = req.params.id;
        this.attributeRule = {
            "name":         'required|string',
            "code":         'required|unique:Attribute,code,id,'+ id,        
            "type":         'required',
            "position":     'required|numeric',
            "required":     'required',
            "unique":       'required',
            "filterable":   'required',
            "configurable": 'required',
            "visible":      'required',
            "comparable":   'required',
            "status":       'required'
        }
        validator(req.body, this.attributeRule, {}, (err, status) => {
            if (!status) {                
                let data = err
                req.flash('validation', data)
                res.redirect('/admin/attribute/edit/' + id)
            } else {
                next();
            }
        });        
    }

}

module.exports = new attributeValidation( );