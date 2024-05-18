"use strict";
const controller = require("./controller");
const menu = require("../services/menu.service");

const menuService = menu.getInstance("Menu"); //("Menu");

class MenusController extends controller {
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
      this.instance = new MenusController(service);
    }
    return this.instance;
  }
}

module.exports = MenusController.getInstance(menuService);
