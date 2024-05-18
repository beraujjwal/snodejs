"use strict";
require("dotenv").config();
const { S3Client } = require("@aws-sdk/client-s3");
const { config } = require("../config/s3.config");

const s3Client = new S3Client({
  region: config.region,
  accessKeyId: config.accessKeyId,
  secretAccessKey: config.secretAccessKey,
});

module.exports = { s3Client };
