const { response } = require('../../system/core/helpers/apiResponse');
const { sequelize } = require('../../system/core/db.connection');

exports.exceptionHandler = (controllerFunction) => {
  return async (req, res, next) => {
    let transaction;
    try {
      transaction = await sequelize.transaction();
      const result = await controllerFunction(req, transaction);
      const resultStructure = {
        code: result.code,
        error: false,
        message: result.message,
        data: result.result
      }
      if(transaction) await transaction.commit();
      return res.status(result.code).json(response(resultStructure));
    } catch (error) {
      if(transaction) await transaction.rollback();
      next(error);
    } finally {
      //if(transaction) transaction.release();
    }
  };
};