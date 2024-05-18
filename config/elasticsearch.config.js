"use strict";
require("dotenv").config();

exports.config = {
  node: process.env.ELASTIC_URL || "http://localhost:9200/",
  cloudId: process.env.ELASTIC_CLOUD_ID,
  username: process.env.ELASTIC_USERNAME || "elastic",
  password: process.env.ELASTIC_PASSWORD || "123456",
};
