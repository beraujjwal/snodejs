"use strict";
require("dotenv").config();
const speakeasy = require("speakeasy");
const { toDataURL } = require("qrcode");
const { config } = require("../config/speakeasy.config");
const { baseError } = require("../system/core/error/baseError");

exports.generateSecret = async (userName, length = 16) => {
  try {
    const name = `${config.namePrefix}-${userName}`;
    const secret = speakeasy.generateSecret({ length, name });
    const qrCodeData = await toDataURL(secret.otpauth_url);
    return { ...secret, qr: qrCodeData };
  } catch (error) {
    console.log("error", error);
    throw new baseError(error);
  }
};

exports.verifyToken = async (secret = "OVUV253RNNZTI3K2HQ2UUPRTLY", token) => {
  try {
    return speakeasy.totp.verify({
      secret: secret,
      encoding: config.encoding,
      token: token,
    });
  } catch (error) {
    throw new baseError(error);
  }
};

exports.validateToken = async (
  secret = "OVUV253RNNZTI3K2HQ2UUPRTLY",
  token
) => {
  try {
    return speakeasy.totp.verify({
      secret,
      encoding: config.encoding,
      token,
      window: 1,
    });
  } catch (error) {
    throw new baseError(error);
  }
};
