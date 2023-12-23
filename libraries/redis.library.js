'use strict';
require('dotenv').config();
const { baseError } = require('../system/core/error/baseError');
const { redisClient } = require('../helpers/redis');
let isRedis = false;

if(redisClient) {
    redisClient.connect().catch((ex)=> {
        error(`Redis client setup process failed!. - ${ex.message}`);
    });

    redisClient.on("connect", function () {
        log('Redis client connected successfully!');
        isRedis = true;
    });
}

exports.set = async (key, value, timeout = '5m') => {
    try {
        if(!isRedis) return null;

        await redisClient.set(key, value, redisClient.print);
        await redisClient.expire(key, getExpiresInTime(timeout));
        return true;
    } catch (ex) {
        error(ex.message);
        throw new baseError(ex);
    }
};

exports.get = async (key) => {
    try {
        if(isRedis) {
            return await redisClient.get(key, function (err, result) {
                if (err) throw new baseError(err);
                return result;
            });
        }
        return null;
    } catch (ex) {
        error(ex.message);
        throw new baseError(ex);
    }
};

exports.delete = async (key) => {
    try {
        if(isRedis) {
            return await redisClient.del(key, function(err, response) {
                if (err) throw new baseError(err);
                return response;
            });
        }
        return null;
    } catch (ex) {
        error(ex.message);
        throw new baseError(ex);
    }
};

function getExpiresInTime(expiresIn) {
    (expiresIn) ? expiresIn : process.env.REDIS_EXPIRES_IN;
    const expiresInInt = parseInt(expiresIn);
    const expiresInString = expiresIn.split(expiresInInt)[1];
    let expiresInTime = expiresInInt
    switch (expiresInString) {
        case 'm':
            expiresInTime = expiresInInt * 60;
            break;
        case 'h':
            expiresInTime = expiresInInt * 60 * 60;
            break;
        case 'd':
            expiresInTime = expiresInInt * 60 * 60 * 24;
            break;

        default:
            expiresInTime = expiresInInt;
            break;
    }
    return expiresInTime;
  }