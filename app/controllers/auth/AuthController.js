'use strict';
const autoBind = require( 'auto-bind' );
const { Controller } = require( '../Controller' );
const { Auth } = require('../../services/Auth');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


class AuthController extends Controller {



  /**
   * Controller constructor
   * @author Ujjwal Bera
   * @param null
   */
  constructor( ) {
      super( );
      this.User = this.db.User;
      this.Role = this.db.Role;
      this.UserRole = this.db.UserRole;
      this.UserTranslation = this.db.UserTranslation;
      this.RoleTranslation = this.db.RoleTranslation;
      this.Permission = this.db.Permission;
      this.RolePermission = this.db.RolePermission;
      this.VerificationToken = this.db.VerificationToken;
      this.Auth = new Auth();
      autoBind( this );
  }



  async signup (req, res) {

    try {

      var signupRes = await this.Auth.signupService(req, res);
      res.status(res.statusCode).json(this.Response.success( __('REGISTER_SUCCESS'), signupRes, res.statusCode));

    } catch ( err ) {
      res.status(res.statusCode).json(this.Response.error( err.message, 404));
    }

  };

  async signin(req, res, next) {

    try {

      var loginRes = await this.Auth.signinService(req, res);
      res.status(res.statusCode).json(this.Response.success( __('LOGIN_SUCCESS'), loginRes, res.statusCode));

    } catch ( err ) {
      res.status(res.statusCode).json(this.Response.error( err.message, 404));
    }

  }
}

module.exports = new AuthController( );
