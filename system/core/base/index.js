'use strict';
require('dotenv').config();
const autoBind = require('auto-bind');
const db = require('../model');


class index {
  /**
   * Base Controller Layer
   * @author Ujjwal Bera
   * @param null
   */
  constructor() {
    this.db = db;
    this.env = process.env;
    autoBind(this);
    
  }

  
}

module.exports = { base: index };
