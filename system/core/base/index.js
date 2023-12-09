'use strict';
require('dotenv').config();
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

    // Get all defined class methods
    const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(this));

    // Bind all methods
    methods
      .filter(method => (method !== 'constructor'))
      .forEach((method) => { this[method] = this[method].bind(this); });
  }


}

module.exports = { base: index };
