"use strict";
require("dotenv").config();
const { Client } = require("@elastic/elasticsearch");

const { config } = require("../config/elasticsearch.config");
//const { baseError } = require("../system/core/error/baseError");

const elasticClient = new Client({
  node: config.node,
  maxRetries: 5,
  requestTimeout: 60000,
  sniffOnStart: true,
  auth: {
    username: config.username,
    password: config.password,
  },
});

elasticClient
  .ping()
  .then(() => {
    log("Elasticsearch connected");
  })
  .catch((err) => {
    error("Unable to connect with Elasticsearch");
    //throw new baseError(err);
  });

module.exports = elasticClient;
