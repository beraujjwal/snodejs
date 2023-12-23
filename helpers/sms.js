'use strict';
require('dotenv').config();
const { baseError } = require('../system/core/error/baseError');
const { config } = require('../config/sms.config');

exports.sendSMS = function (smsOptions) {
    log(smsOptions);
    return true;
};
