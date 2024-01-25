const { service } = require( './service' );

class permission extends service {
  /**
   * @description permission service constructor
   * @author Ujjwal Bera
   * @param null
   */
  constructor(model) {
    super(model);
  }

}

module.exports = { permission };
