'use strict';
const autoBind = require( 'auto-bind' );
const validator = require( './validate' );
const { Middleware } = require( '../middleware/Middleware' );


class userValidation extends Middleware {


    /**
     * Controller constructor
     * @author Ujjwal Bera
     * @param null
     */
    constructor( ) {
        super( );        
        this.User = this.db.User;
        this.signupRule = {
            "name":     'required|string',
            "email":    'required|email|unique:User,email',        
            "phone":    'required|numeric|length:10|unique:User,phone',
            "password": 'required|string|min:6',
            "agree":    'required'
        }
        
        this.signinRule = {
            "username": "required",
            "password": "required",
        }
        autoBind( this );
    }



    async signupValidation(req, res, next) {
        
        validator(req.body, this.signupRule, {}, (err, status) => {
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



    async signupWebValidation(req, res, next) {
        validator(req.body, this.signupRule, {}, (err, status) => {
            if (!status) {
                let data = err
                req.flash('validation', data)
                res.redirect('/auth/signup')
            } else {
                next();
            }
        });        
    }



    async signinValidation(req, res, next) {
        
        validator(req.body, this.signinRule, {}, (err, status) => {
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



    async signinWebValidation(req, res, next) {
        
        validator(req.body, this.signinRule, {}, (err, status) => {
            if (!status) {
                req.flash('validation', err)
                res.redirect('/auth/signin')
            } else {
                next();
            }
        });        
    }

}

module.exports = new userValidation( );