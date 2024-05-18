"use strict";
require("dotenv").config();
const { twilioClient } = require("../helpers/sms");

exports.sentOTPSMS = async (phoneNumber, message = "Hello from app") => {
  try {
    const fromPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
    return await twilioClient.messages.create({
      body: message,
      to: phoneNumber, // Text your number
      from: fromPhoneNumber, // From a valid Twilio number
    });
  } catch (ex) {
    error(ex.message);
    throw new baseError(ex);
  }
};

exports.sent2FAOTP = async (phoneNumber, channel = "sms") => {
  try {
    const serviceId = process.env.TWILIO_2FA_SID;

    return await twilioClient.verify.v2
      .services(serviceId)
      .verification.create({ to: phoneNumber, channel: channel });
  } catch (ex) {
    error(ex.message);
    throw new baseError(ex);
  }
};

exports.verify2FAOTP = async (phoneNumber, code) => {
  try {
    const serviceId = process.env.TWILIO_2FA_SID;

    return await twilioClient.verify.v2
      .services(serviceId)
      .verificationChecks.create({ to: phoneNumber, code: code });
  } catch (ex) {
    error(ex.message);
    throw new baseError(ex);
  }
};
