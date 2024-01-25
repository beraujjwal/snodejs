const { controller } = require( './controller' );
const { permission } = require('../services/permission.service');
const permissionService = new permission('Permission');

class PermissionsController extends controller {



  /**
   * Controller constructor
   * @author Ujjwal Bera
   * @param null
   */
  constructor( service ) {
    super( service );
  }

}

module.exports = new PermissionsController( permissionService );