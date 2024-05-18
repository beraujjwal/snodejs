"use strict";
require("dotenv").config();
const path = require("path");
exports.config = {
  encoding: process.env.SPEAKEASY_ENCODING,
  length: process.env.SPEAKEASY_LENGTH,
  namePrefix: process.env.SPEAKEASY_NAME_PREFIX,
};
