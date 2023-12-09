const jwt = require('jsonwebtoken');
const { middleware } = require('./middleware');
const { baseError } = require('../../system/core/error/baseError');
const redisClient = require('../../libraries/redis.library');
const { sequelize } = require('../../system/core/db.connection');
const { user } = require('../services/user.service');

const userService = new user('User');

class aclMiddleware extends middleware {
  /**
   * @description Controller constructor
   * @author Ujjwal Bera
   * @param null
   */
  constructor() {
    super();
  }

  /**
   * @description Controller constructor
   * @author Ujjwal Bera
   * @param {*} action
   * @param {*} module
   * @returns
   */
  hasPermission(action, module) {

    return async function (req, res, next) {
      try {
        const userData = req.user;

        if(!userData?.id) throw new baseError(`Invalid authorization token.`, 401);
        let user = await redisClient.get(`${userData.id}#${userData.tokenSalt}`);

        if(!user) {
          const criteria =  { id: userData.id, tokenSalt: userData.tokenSalt, status: true, verified: true };
          const transaction = await sequelize.transaction();
          user = await userService.getUserDetails({criteria, transaction });
          if(transaction) await transaction.commit();
        } else {
          user = JSON.parse(user);
        }
        const userRoles = user.roles;
        const userResources = user.resources;
        let haveAccess = false;
        let runLoop = true;
        loop1: if (haveAccess === false && runLoop === true) {
          for await (const resource of userResources) {
            if (resource?.slug === 'root' && resource?.userResourcePermissions[0]?.slug === 'fullAccess') {
              haveAccess = true;
              break loop1;
            } else if(resource?.slug === module) {

              for await (const permission of resource?.userResourcePermissions) {
                if (permission?.slug === 'fullDeny') {
                  runLoop = false;
                  break loop1;
                } else if (permission?.slug === 'fullAccess') {
                  haveAccess = true;
                  break loop1;
                } else if (permission?.slug === action) {
                  haveAccess = true;
                  break loop1;
                }
              }
            }
          }

          for await (const role of userRoles) {
            const roleResources = role.resources;
            for await (const resource of roleResources) {
              if (resource?.slug === 'root' && resource?.roleResourcePermissions[0]?.slug === 'fullAccess') {
                haveAccess = true;
                break loop1;
              } else if(resource?.slug === module) {

                for await (const permission of resource?.roleResourcePermissions) {
                  if (permission?.slug === 'fullDeny') {
                    runLoop = false;
                    break loop1;
                  } else if (permission?.slug === 'fullAccess') {
                    haveAccess = true;
                    break loop1;
                  } else if (permission?.slug === action) {
                    haveAccess = true;
                    break loop1;
                  }
                }

              }
            }
          }
        }

        if (haveAccess == false) {
          throw new baseError(`Unauthorized to access this section.`, 403);
        }

        next();
        return;
      } catch (ex) {
        next(ex);
      }
    };
  }
}

module.exports = new aclMiddleware();
