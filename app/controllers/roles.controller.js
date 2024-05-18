"use strict";
const controller = require("./controller");
const role = require("../services/role.service");

const roleService = role.getInstance("Role"); //new role("Role");

class RolesController extends controller {
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
      this.instance = new RolesController(service);
    }
    return this.instance;
  }
}

module.exports = RolesController.getInstance(roleService);
