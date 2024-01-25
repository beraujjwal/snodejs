'use strict';
const { controller } = require( './controller' );
const { role } = require('../services/role.service');

const roleService = new role('Role');


class RolesController extends controller {



  /**
   * Controller constructor
   * @author Ujjwal Bera
   * @param null
   */
  constructor( service ) {
      super( service );
  }
}

module.exports = new RolesController( roleService );