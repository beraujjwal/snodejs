'use strict';
const { Controller } = require( './Controller' );
const { Auth } = require('../services/Auth');
const { User } = require('../services/User');
const { Utilities } = require('../services/Utilities');
const autoBind = require( 'auto-bind' );
const nodemailer = require('nodemailer');
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");



class UsersController extends Controller {



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
      this.Auth = new Auth();
      this.User = new User();
      this.Utilities = new Utilities();
      autoBind( this );
  }



  async dashboard (req, res) {
    // Save User to Database
    res.render('admin/users/dashboard', { title: 'User Authentic', msg: 'Uh oh snap! You are drive to the wrong way', error: false })
  }



  async adminUsers(req, res) {
    try {
      //logger.debug('This is the "/" route.')
      var usersList = await this.User.usersListService(req, res);
      var userDatas = JSON.parse(JSON.stringify(usersList));
      //console.log(userDatas)
      if(userDatas) {
        res.render('admin/users/users', {userDatas: userDatas});
      }else {
        res.render('admin/users/users', {userDatas: userDatas, error: true});
      }
    } catch ( err ) {
      console.log(err);
      res.render('admin/users/users', {error: true, message: err.message});
    }
  }



  async adminAddUser(req, res) {
    try {
      var languages = await this.Utilities.getLanguages();
      res.render('admin/users/user_add', { title: 'User add', msg: 'Add New Users', error: false, languages: languages })
    } catch ( err ) {
      console.log(err);
      res.render('admin/users/user_add', {error: true, message: err});
    }
  }



  async adminStoreUser(req, res) {
    var languages = await this.Utilities.getLanguages();
    try {
      var userStore = await this.User.userStore(req, res);
      res.redirect('/admin/users')
    } catch ( err ) {
      console.log(err);
      res.render('admin/users/user_add', {error: true, message: err, languages: languages});
    }
  }



  async adminEditUser(req, res) {
    var languages = await this.Utilities.getLanguages();
    try {
      var userDetails = await this.User.usersDetailsService(req, res);

      var userDatas = JSON.parse(JSON.stringify(userDetails));
      res.render('admin/users/user_edit', { title: 'User Edit', msg: 'Edit Users', error: false, userDatas: userDatas, languages: languages })
    } catch ( err ) {
      console.log(err);
      res.render('admin/users/user_edit', {error: true, message: err, languages: languages});
    }
  }



  async adminUpdateUser(req, res) {
    try {
      console.log(req.body);
      var updateUser = await this.User.userUpdate(req, res);
      res.redirect('/admin/users')
    } catch ( err ) {
      console.log(err);
      res.render('admin/users/user_edit', {error: true, message: err});
    }
  }



  async adminDeleteUser(req, res) {
    try {
      var usersList = await this.User.usersListService(req, res);
      var userDatas = JSON.parse(JSON.stringify(usersList));
      if(userDatas) {
        res.render('admin/users/users', {userDatas: userDatas});
      }else {
        res.render('admin/users/users', {userDatas: userDatas, error: true});
      }
    } catch ( err ) {
      console.log(err);
      res.render('admin/users/users', {error: true, message: err});
    }
  }

}

module.exports = new UsersController( );
