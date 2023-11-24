'use strict';
const { baseController } = require('../../system/core/controller/baseController');
const { baseError } = require('../../system/core/error/baseError');
//const autoBind = require('auto-bind');

class controller extends baseController {
  /**
   * @desc Controller constructor
   *
   * @author Ujjwal Bera
   * @param null
   */
  constructor(service) {
    super(service);
    //autoBind(this);
  }
}

module.exports = { controller };
