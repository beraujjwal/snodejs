"use strict";
require("dotenv").config();
const { config } = require("../config/sms.config");

//const { Twilio } = require("twilio");

const twilioClient = require("twilio")(config.accountSid, config.authToken);

// const twilioClient = new Twilio({
//   accountSid: config.accountSid,
//   authToken: config.authToken,
// });

module.exports = { twilioClient };
