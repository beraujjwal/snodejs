'use strict';
const autoBind = require('auto-bind');
const jwt = require('jsonwebtoken');
const { baseService } = require('@core/service/baseService');

const mailer = require('../helpers/mailer');
//const crypto = require("crypto");

class service extends baseService {
  /**
   * Service constructor
   * @author Ujjwal Bera
   * @param null
   */
  constructor(model) {
    super(model);
    //this.mailer = mailer;
    //this.model = this.db[model];
    //this.crypto = crypto;
    autoBind(this);
  }

  async isUnique(model, key, value, id = null) {
    const query = [];

    value = value.toLowerCase();
    value = value.replace(/[^a-zA-Z ]/g, '');
    value = value.replace(/[^a-zA-Z]/g, '-');

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
}

module.exports = { service };
