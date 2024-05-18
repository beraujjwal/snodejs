const {
  baseController,
} = require("../../system/core/controller/baseController");
const { baseError } = require("../../system/core/error/baseError");

class controller extends baseController {
  /**
   * @desc Controller constructor
   *
   * @author Ujjwal Bera
   * @param null
   */
  constructor(service) {
    super(service);
  }

  static getInstance(service) {
    if (!this.instance) {
      this.instance = new controller(service);
    }
    return this.instance;
  }
}

module.exports = controller;
