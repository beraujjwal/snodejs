'use strict';
require('dotenv').config();
const chalk = require('chalk');
const { baseError } = require('../system/core/error/baseError');
const { redisClient } = require('../app/helpers/redis');
const log = console.log;
let isRedis = false;

if(redisClient) {
    redisClient.connect().catch((err)=> {
        log(chalk.red.bgWhite.bold('✘ Redis client setup process failed!'));
    });

    redisClient.on("connect", function () {
        log(chalk.green.bgWhite.bold('✔ Redis client connected successfully!'));
        isRedis = true;
    });
}

exports.set = async (key, value, timeout = '5m') => {
    try {
        if(isRedis) {
            await redisClient.set(key, value, redisClient.print);
            await redisClient.expire(key, getExpiresInTime(timeout));
            return true;
        }
        return null;
    } catch (ex) {
        throw new baseError(ex);
    }
};

exports.get = async (key) => {
    try {
        if(isRedis) {
            return await redisClient.get(key, function (err, result) {
                if (err) {
                    throw new baseError(err);
                }
                return result;
            });
        }
        return null;
    } catch (ex) {
        throw new baseError(ex);
    }
};

exports.delete = async (key) => {
    try {
        if(isRedis) {
            return await redisClient.del(key, function(err, response) {
                if (err) {
                    throw new baseError(err);
                }
                return response;
            });
        }
        return null;
    } catch (ex) {
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