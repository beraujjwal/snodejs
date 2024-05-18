const { baseService } = require("../../system/core/service/baseService");

module.exports = class service extends baseService {
  /**
   * Service constructor
   * @author Ujjwal Bera
   * @param null
   */
  constructor(model) {
    super(model);
  }

  static getInstance(model) {
    if (!this.instance) {
      this.instance = new service(model);
    }
    return this.instance;
  }

  async isUnique(model, key, value, id = null) {
    const query = [];

    value = value.toLowerCase();
    value = value.replace(/[^a-zA-Z ]/g, "");
    value = value.replace(/[^a-zA-Z]/g, "-");

    if (value) {
      query.push({
        [key]: {
          [this.Op.eq]: value,
        },
      });
    }

    if (id != null) {
      query.push({
        id: {
          [this.Op.ne]: id,
        },
      });
    }

    return model.findOne({
      where: {
        [this.Op.and]: query,
      },
    });
  }
};
