const controller = require("./controller");
const permission = require("../services/permission.service");
const { indexExists } = require("../../libraries/elasticsearch.library");
const permissionService = permission.getInstance("Permission"); //new permission("Permission");

class PermissionsController extends controller {
  /**
   * Controller constructor
   * @author Ujjwal Bera
   * @param null
   */
  constructor(service) {
    super(service);
  }

  static getInstance(service) {
    if (!this.instance) {
      this.instance = new PermissionsController(service);
    }
    return this.instance;
  }
}

module.exports = PermissionsController.getInstance(permissionService);
