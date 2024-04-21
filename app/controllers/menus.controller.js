"use strict";
const { controller } = require("./controller");
const { menu } = require("../services/menu.service");

const menuService = new menu("Menu");

class MenusController extends controller {
  /**
   * Controller constructor
   * @author Ujjwal Bera
   * @param null
   */
  constructor(service) {
    super(service);
  }
}

module.exports = new MenusController(menuService);
