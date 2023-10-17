'use strict';
const { baseError } = require('../../system/core/error/baseError');
const { config } = require('../../config/redis.config');
const redis = require('redis');

exports.redisClient = redis.createClient({
  port      : config.port,
  host      : config.host,
  url       : config.url
});