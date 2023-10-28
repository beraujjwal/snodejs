'use strict';
const jwt = require('jsonwebtoken');
const autoBind = require('auto-bind');
const { middleware } = require('./middleware');
const { baseError } = require('../../system/core/error/baseError');
const redisClient = require('../../libraries/redis.library'); //Enable this line if you want to config redis also with line no 56
const User = require('../../models/user.model');

class authMiddleware extends middleware {
  /**
   * Controller constructor
   * @author Ujjwal Bera
   * @param null
   */
  constructor() {
    super();
  }

  /**
   *
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns
   */
  async verifyToken(req, res, next) {
    let bearerHeader = req.headers['authorization'];

    if( !bearerHeader ){
      throw new baseError(`Authorization token not found.`, 401);
    }

    const token = bearerHeader.split(' ')[1];
    if( !token ){
      throw new baseError(`Unauthorized to access this section.`, 401);
    }

    try {
      const decoded = await jwt.verify(token, this.env.JWT_SECRET);

      if (!decoded) {
        throw new baseError(`Invalid authorization token.`, 401);
      }

      let user = await redisClient.get(`${decoded.id}#${decoded.tokenSalt}`);

      if(!user) {
        user = await User.unscoped().findByPk(decoded.id, { attributes: { include: [ 'id', 'name', 'tokenSalt', 'status', 'verified' ] }});
        user = user.toJSON();
      } else {
        user = JSON.parse(user);
      }

      if (user === null || user.tokenSalt !== decoded.tokenSalt || user.status === false || user.verified === false) {
        throw new baseError(`Invalid authorization token.`, 401);
      }

      req.user = user;
      next();

      return;
    } catch (ex) {
      next(ex);
    }
  }

  /**
   *
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns
   */
  async verifyiNCompletedToken(req, res, next) {

    let bearerHeader = req.headers['authorization'];

    let userRole = req.params.role;
    req.role = userRole;
    if( !bearerHeader ){
      next('Authorization token not found!');
    }

    const token = bearerHeader.split(' ')[1];
    if( !token ){
      next('Authorization token not found!!');
    }

    try {
      let decoded = await jwt.verify(token, this.env.JWT_SECRET);
      if (!decoded) {
        next('Invalid authorization token4.');
      }

      console.debug('decoded', decoded)
      req.user_id = decoded.id;

      let salt = (decoded.tokenSalt) ? decoded.tokenSalt : 1;
      //Finding user with set criteria
      let user = await this.User.findOne({
        _id: decoded.id,
        tokenSalt: salt,
        deleted: false,
      }).populate('roles', '-__v').exec();

      if (user === null) {
        next('Invalid authorization token5.');
      }

      const authorities = [];
      for await (const role of user.roles) {
        authorities.push(role?.slug);
      }

      if(userRole) {
        if(!authorities.includes(userRole)) {
          next('Invalid authorization token6.');
        }
      }

      req.user = JSON.parse(JSON.stringify(user));
      next();

      return;
    } catch (ex) {
      next(ex.message);
    }
  }
}

module.exports = new authMiddleware();