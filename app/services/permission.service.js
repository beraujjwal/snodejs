const service = require("./service");

module.exports = class permission extends service {
  /**
   * @description permission service constructor
   * @author Ujjwal Bera
   * @param null
   */
  constructor(model) {
    super(model);
  }

  static getInstance(model) {
    if (!this.instance) {
      this.instance = new permission(model);
    }
    return this.instance;
  }
};
