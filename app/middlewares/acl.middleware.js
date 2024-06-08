const jwt = require("jsonwebtoken");
const { middleware } = require("./middleware");
const { baseError } = require("../../system/core/error/baseError");
const redisClient = require("../../libraries/redis.library");
const { sequelize } = require("../../system/core/db.connection");
const user = require("../services/user.service");

const userService = user.getInstance("User"); //new user("User");

class aclMiddleware extends middleware {
  /**
   * @description Controller constructor
   * @author Ujjwal Bera
   * @param null
   */
  constructor() {
    super();
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new aclMiddleware();
    }
    return this.instance;
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

        if (!userData?.id)
          throw new baseError(`Invalid authorization token.`, 401);
        let user = await redisClient.get(
          `${userData.id}#${userData.tokenSalt}`
        );

        if (!user) {
          const criteria = {
            id: userData.id,
            //tokenSalt: userData.tokenSalt,
            status: true,
            verified: true,
          };
          user = await userService.getUserDetails({
            criteria,
            transaction: null,
          });
        } else {
          user = JSON.parse(user);
        }

        const userRoles = user.roles;
        const userResources = user.resources;
        let haveAccess = false;
        let runLoop = true;

        //console.log("userRoles", userRoles);
        //console.log("userResources", userResources);
        loop1: if (haveAccess === false && runLoop === true) {
          if (userResources.length > 0) {
            for await (const resource of userResources) {
              if (
                resource?.slug === "root" &&
                resource?.userResourcePermissions[0]?.slug === "full-access"
              ) {
                haveAccess = true;
                break loop1;
              } else if (resource?.slug === module) {
                for await (const permission of resource?.userResourcePermissions) {
                  if (permission?.slug === "full-deny") {
                    runLoop = false;
                    break loop1;
                  } else if (permission?.slug === "full-access") {
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
          if (userRoles.length > 0) {
            for await (const role of userRoles) {
              const roleResources = role.resources;
              if (roleResources.length > 0) {
                for await (const resource of roleResources) {
                  if (
                    resource?.slug === "root" &&
                    resource?.resourceRolePermissions[0]?.slug === "full-access"
                  ) {
                    haveAccess = true;
                    break loop1;
                  } else if (resource?.slug === module) {
                    for await (const permission of resource?.resourceRolePermissions) {
                      if (permission?.slug === "full-deny") {
                        runLoop = false;
                        break loop1;
                      } else if (permission?.slug === "full-access") {
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

module.exports = aclMiddleware.getInstance();
