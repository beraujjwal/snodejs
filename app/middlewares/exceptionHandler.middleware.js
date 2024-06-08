const { response } = require("../../system/core/helpers/apiResponse");
const { sequelize } = require("../../system/core/db.connection");
const parser = require("ua-parser-js");

exports.exceptionHandler = (controllerFunction) => {
  return async (req, res, next) => {
    let transaction;
    try {
      const ua = parser(req.headers["user-agent"]);
      //console.log("ua", ua);
      const deviceInfo = {
        ip: req.header("x-forwarded-for") || req.socket.remoteAddress,
        browser: ua?.browser?.name || "Unknown",
        os: ua?.os?.name || "Unknown",
        deviceId: req.headers["device-id"] || "Unknown",
      };
      //console.log("deviceInfo", deviceInfo);
      transaction = await sequelize.transaction();
      req.deviceInfo = deviceInfo;
      const result = await controllerFunction(req, transaction);
      const resultStructure = {
        code: result.code,
        error: false,
        message: result.message,
        data: result.result,
      };
      if (transaction) await transaction.commit();
      return res.status(result.code).json(response(resultStructure));
    } catch (error) {
      console.log(error);
      if (transaction) await transaction.rollback();
      next(error);
    } finally {
      //if(transaction) transaction.release();
    }
  };
};
