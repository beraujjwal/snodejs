'use strict';
const { controller } = require( './controller' );
const { user } = require('../services/user.service');

const userService = new user('User');

class UsersController extends controller {



  /**
   * Controller constructor
   * @author Ujjwal Bera
   * @param null
   */
  constructor( service ) {
      super( service );
  }



}

module.exports = new UsersController( userService );
