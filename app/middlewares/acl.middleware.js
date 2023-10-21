'use strict';
const autoBind = require('auto-bind');
const jwt = require('jsonwebtoken');
const { middleware } = require('./middleware');
const { baseError } = require('../../system/core/error/baseError');
//const redisClient = require('../../libraries/redis.library'); //Enable this line if you want to config redis also with line no 54
const User = require('../../models/user.model');
const Role = require('../../models/role.model');
const Permission = require('../../models/role.model');

class aclMiddleware extends middleware {
  /**
   * Controller constructor
   * @author Ujjwal Bera
   * @param null
   */
  constructor() {
    super();
    //this.User = this.db.User;
    autoBind(this);
  }

  /**
   *
   * @param {*} action
   * @param {*} module
   * @returns
   */
  hasPermission(action, module) {
    const userModel = this.User;
    const env = this.env;
    return async function (req, res, next) {



      try {
        const userData = req.user;
        const userId = userData.id;

        if(!userId) throw new baseError(`Invalid authorization token.`, 401);

        //Finding user with set criteria
        //const userData = await redisClient.getValue(userId); //If you are using redis then you can try this process and disable 55 line code.
        //const userData = await User.findByPk(decoded.id, {include: ['roles']});
        const user = await User.findByPk(userId);

        console.log(JSON.parse(JSON.stringify(user.roles[0].permissions)));

        let haveAccess = false;
        loop1: if (haveAccess === false) {
          for await (const permission of user?.permissions) {
            if (permission.slug === 'root') {

            }
          }










          // //Checking role have permission
          // for await (const role of user?.roles) {
          //   for await (const right of role?.rights) {
          //     if (right?.resource === 'root') {
          //       if (right?.fullAccess && right?.fullAccess === true) {
          //         haveAccess = true;
          //         break loop1;
          //       }
          //     }
          //     if (right?.resource === module) {
          //       if (right?.fullDeny && right?.fullDeny === false) {
          //         break loop1;
          //       } else if (right?.fullAccess && right?.fullAccess === true) {
          //         haveAccess = true;
          //         break loop1;
          //       } else if (right[action] && right[action] === true) {
          //         haveAccess = true;
          //         break loop1;
          //       } else {
          //         break loop1;
          //       }
          //     }
          //   }
          // }

          // //Checking user have permission
          // for await (const right of user.rights) {
          //   if (right.resource === 'root') {
          //     if (right.fullAccess && right.fullAccess === true) {
          //       haveAccess = true;
          //       break loop1;
          //     }
          //   }
          //   if (right.resource === module) {
          //     if (right.fullDeny && right.fullDeny === false) {
          //       break loop1;
          //     } else if (right.fullAccess && right.fullAccess === true) {
          //       haveAccess = true;
          //       break loop1;
          //     } else if (right[action] && right[action] === true) {
          //       haveAccess = true;
          //       break loop1;
          //     } else {
          //       break loop1;
          //     }
          //   }
          // }
        }

        if (haveAccess == false) {
          const err = new Error('Unauthorized to access this section.');
          err.statusCode = 403;
          next(err);
        }

        next();
        return;
      } catch (ex) {
        console.log(ex);
        next(ex.message);
      }
    };
  }
}

module.exports = new aclMiddleware();
