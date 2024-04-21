"use strict";
const { Sequelize, Op } = require("sequelize");
const { service } = require("./service");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const moment = require("moment");

const { baseError } = require("../../system/core/error/baseError");
const redisClient = require("../../libraries/redis.library");

const { token } = require("./token.service");
const { role } = require("./role.service");

const tokenService = new token("Token");
const roleService = new role("Role");

const { sentOTPMail } = require("../../libraries/email.library");
const { sentOTPSMS } = require("../../libraries/sms.library");

const { generateOTP, generateAccessToken } = require("../../helpers/utility");

class user extends service {
  /**
   * Service constructor
   * @author Ujjwal Bera
   * @param null
   */
  constructor(model) {
    super(model);
    this.model = this.getModel(model);
    this.role = this.getModel("Role");
    this.permission = this.getModel("Permission");
    this.resource = this.getModel("Resource");
  }

  /**
   * @description Attempt to user signup service with the provided object
   * @author Ujjwal Bera
   * @param req object
   * @param res object
   * @return json object
   */
  async singup({ name, email, phone, password, roles }, transaction) {
    try {
      console.log("roles", roles);
      //Registering new user
      if (!roles) throw new baseError(__("INVALI_ROLES_SELECTED"));

      const tokenSalt = await generateOTP(6, { digits: true });
      const user = await this.model.create(
        {
          name,
          phone,
          email,
          password, //: bcrypt.hashSync(password, 8),
          status: true,
          verified: false,
          tokenSalt,
        },
        { transaction }
      );

      const userId = user.id;
      const sentOn = email || phone;
      const userToken = await tokenService.createToken(
        { userId, sentFor: "ACTIVATION", sentOn },
        transaction
      );
      const userRoles = await roleService.createUserRole(
        { userId, roles },
        transaction
      );

      if (!email) {
        sentOTPSMS(phone, userToken.token);
      } else {
        sentOTPMail(email, userToken.token);
      }

      let signupRes = { user, roles: userRoles };
      return signupRes;
    } catch (error) {
      console.log(error);
      throw new baseError(error);
    }
  }

  /**
   * @description Attempt to user login with the provided object
   * @param req {object} Object containing all required fields to do user login
   * @param res {object} Object containing all required fields to do user login
   * @returns {Promise<{success: boolean, error: *}|{success: boolean, data: *}>}
   */
  async singin(
    { username, password },
    { device_id, device_type, fcm_token },
    transaction
  ) {
    const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    try {
      const criteria = username.match(regexEmail)
        ? {
            email: username,
            isEmailVerified: true,
            status: true,
            verified: true,
          }
        : {
            phone: username,
            isPhoneVerified: true,
            status: true,
            verified: true,
          };

      const user = await this.getUserDetails({ criteria, transaction });
      if (!user) {
        throw new baseError(__("LOGIN_INVALID_USERNAME_PASSWORD"), 401);
      }

      const passwordIsValid = bcrypt.compareSync(password, user?.password);

      if (!passwordIsValid) {
        throw new baseError(__("LOGIN_INVALID_USERSNAME_PASSWORD"), 401);
      }

      const roles = [];
      for await (const role of user.roles) {
        roles.push(role.slug);
      }

      const tokenSalt = await generateOTP(6, { digits: true });
      const accessToken = await generateAccessToken(
        user.id,
        user.phone,
        user.email,
        tokenSalt
      );

      const filter = { id: user.id };
      const data = {
        loginAttempts: 0,
        tokenSalt: tokenSalt,
        blockExpires: moment().utc(this.getEnv("APP_TIMEZONE")).toDate(),
        deviceId: device_id,
        deviceType: device_type,
        fcmToken: fcm_token,
      };

      await this.model.update(
        data,
        {
          where: filter,
        },
        { transaction: transaction }
      );
      const userWithLatestData = { ...user, ...data };
      redisClient.set(
        `${user.id}#${data.tokenSalt}`,
        JSON.stringify(userWithLatestData),
        this.getEnv("JWT_EXPIRES_IN")
      );
      delete userWithLatestData.password;
      delete userWithLatestData.tokenSalt;
      const loginRes = {
        user: userWithLatestData,
        roles,
        accessToken,
      };

      return loginRes; //.toJson();
    } catch (ex) {
      console.log("ex", ex);
      throw new baseError(ex);
    }
  }

  /**
   * @description Attempt to user activate with the provided object
   * @param req {object} Object containing all required data to do user activate
   * @param res {object}
   * @returns {Promise<{success: boolean, error: *}|{success: boolean, data: *}>}
   */
  async activateService(req, res) {
    var username = req.params.username;
    var token = req.params.token;
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var criteria = username.match(regexEmail)
      ? { email: username }
      : { phone: username };

    try {
      var user = await this.User.findOne({
        where: criteria,
      });

      if (user == null) {
        throw new Error(`User not found.`);
      }

      if (user.verified) {
        throw new Error(`User already verified.`);
      }

      var foundToken = await this.VerificationToken.findOne({
        where: { token: token, type: "signup", status: true },
      });

      if (foundToken == null) {
        throw new Error(`Verification token not found.`);
      }

      await user.update({ verified: true }).catch((reason) => {
        throw new Error(reason);
      });

      await foundToken.update({ status: false }).catch((reason) => {
        throw new Error(reason);
      });

      //`User with ${inputDetails.field} ${inputDetails.value} has been verified`

      var activateRes = {
        status: true,
        message: `Your Account has been activated successfully.`,
      };
      return activateRes;
    } catch (ex) {
      throw new Error(ex);
    }
  }

  async resetPasswordService(req, res) {
    const username = req.body.username;
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var criteria = username.match(regexEmail)
      ? { email: username }
      : { phone: username };
    try {
      var user = await this.User.findOne({
        where: criteria, //checking if the email address or phone sent by client is present in the db(valid)
      });

      if (user == null) {
        throw new Error(`User not found.`);
      }

      var verificationToken = await this.VerificationToken.findOne({
        where: { user_id: user.id, type: "reset_password" },
      });

      if (verificationToken != null) {
        this.VerificationToken.destroy({
          where: {
            id: verificationToken.id,
          },
        });
      }

      var token = this.crypto.randomBytes(64).toString("hex"); //creating the token to be sent to the forgot password form (react)
      await bcrypt.hash(token, null, null, function (err, hash) {
        //hashing the password to store in the db node.js
        console.log(this.getEnv("RESET_PASSWORD_TOKEN_EXPIRES_IN"));
        var dt = new Date();
        dt.setSeconds(
          dt.getSeconds() +
            parseInt(this.getEnv("RESET_PASSWORD_TOKEN_EXPIRES_IN"))
        );
        this.VerificationToken.create({
          user_id: user.id,
          token: hash,
          type: "reset_password",
          status: true,
          expire_at: dt,
        }).then(function (item) {
          if (!item)
            return throwFailed(
              res,
              "Oops problem in creating new password record"
            );
          let mailOptions = {
            to: user.email,
            subject: "Reset your account password",
            html:
              "<h4><b>Reset Password</b></h4>" +
              "<p>To reset your password, complete this form:</p>" +
              "<a href=" +
              config.clientUrl +
              "reset/" +
              user.id +
              "/" +
              token +
              '">' +
              config.clientUrl +
              "reset/" +
              user.id +
              "/" +
              token +
              "</a>" +
              "<br><br>" +
              "<p>--Team</p>",
          };

          this.mailer.send(mailOptions);

          let mailSent = sendMail(mailOptions); //sending mail to the user where he can reset password.User id and the token generated are sent as params in a link
          if (mailSent) {
            return res.json({
              success: true,
              message: "Check your mail to reset your password.",
            });
          } else {
            return throwFailed(error, "Unable to send email.");
          }
        });
      });
    } catch (ex) {
      throw new Error(ex);
    }
  }

  async usersListService(req, res) {
    // Save User to Database
    var lang = getLocale();

    try {
      var name = "name";
      var order = "id";
      var ordering = "ASC";
      var queries = req.query;
      var offset = 0;
      var limit = 100;
      const query = [];
      const innerQuery = [];

      if (req.query.limit) {
        limit = req.query.limit;
      }

      if (req.query.page) {
        if (req.query.page > 1) {
          offset = req.query.page * limit - limit;
        }
      }

      if (req.query.orderby) {
        order = req.query.orderby;
      }

      if (req.query.ordering) {
        ordering = req.query.ordering;
      }

      if (req.query.keyword) {
        innerQuery.push({
          [name]: {
            [this.Op.iLike]: `%${req.query.keyword}%`,
          },
        });
      }

      if (req.query.keyword) {
        query.push({
          phone: {
            [this.Op.iLike]: `%${req.query.keyword}%`,
          },
        });
      }

      if (req.query.keyword) {
        query.push({
          email: {
            [this.Op.iLike]: `%${req.query.keyword}%`,
          },
        });
      }

      return await this.User.findAll({
        where: {
          [this.Op.and]: query,
        },
        include: [
          {
            model: this.Role,
            as: "roles",
            required: false,
          },
        ],
        order: [[order, ordering]],
        offset: offset,
        limit: limit,
      });
    } catch (ex) {
      throw new Error(ex);
    }
  }

  async usersDetailsService(criteria, transaction) {
    try {
      var lang = getLocale();
      return await this.User.findOne({
        where: {
          id: req.params.id,
        },
      });
    } catch (ex) {
      throw new Error(ex);
    }
  }

  async userUpdate(req, res) {
    var lang = getLocale();

    try {
      // Then, we do some calls passing this transaction as an option:

      const [numberOfAffectedRows, affectedRows] = await this.User.update(
        {
          phone: req.body.phone,
          email: req.body.email,
        },
        {
          where: { id: req.params.id },
          returning: true, // needed for affectedRows to be populated
          plain: true, // makes sure that the returned instances are just plain objects
        }
      );
      var namesData = req.body.name;
      for (let index of Object.keys(namesData)) {
        var userTranslation = await this.UserTranslation.findOne({
          where: { user_id: req.params.id, lang: index },
        });
        console.log(JSON.parse(JSON.stringify(userTranslation)));
        if (userTranslation.id) {
          await this.UserTranslation.update(
            { name: namesData[index], updated_at: new Date() },
            {
              returning: true,
              plain: true,
              where: { user_id: req.params.id, lang: index },
            }
          );
        } else
          await this.UserTranslation.create({
            name: namesData[index],
            lang: index,
            user_id: req.params.id,
            status: true,
            created_at: new Date(),
            updated_at: new Date(),
          });
      }

      return true;
    } catch (ex) {
      throw new Error(ex);
    }
  }

  async userStore(req, res) {
    try {
      // Then, we do some calls passing this transaction as an option:

      const user = await this.User.create({
        phone: req.body.phone,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        status: true,
        created_at: new Date(),
        updated_at: new Date(),
      });
      var namesData = req.body.name;
      for (let index of Object.keys(namesData)) {
        await this.UserTranslation.create({
          name: namesData[index],
          lang: index,
          user_id: user.id,
          status: true,
          created_at: new Date(),
          updated_at: new Date(),
        });
      }

      return true;
    } catch (ex) {
      throw new Error(ex);
    }
  }

  async invalidLoginAttempt(user, transaction) {
    try {
      let blockLoginAttempts = parseInt(this.getEnv("BLOCK_LOGIN_ATTEMPTS"));
      const loginAttempts = user?.loginAttempts
        ? parseInt(user.loginAttempts)
        : 0;
      let filter = { id: user.id };
      let data = { loginAttempts: loginAttempts + 1 };
      if (loginAttempts >= blockLoginAttempts) {
        let blockExpires = new Date(Date.now() + 60 * 5 * 1000);
        data = { ...data, loginAttempts: 0, blockExpires };
      }
      await this.model.update(
        data,
        {
          where: filter,
        },
        { transaction: transaction }
      );

      console.log(
        `loginAttempts${loginAttempts}-> >= blockLoginAttempts${blockLoginAttempts}`
      );
      if (loginAttempts >= blockLoginAttempts) {
        throw new baseError(
          "Your login attempts exist. Please try after 300 seconds."
        );
      } else {
        await this.UnauthorizedError(
          "You have submitted invalid login details."
        );
      }
    } catch (ex) {
      throw new baseError(
        ex.message || "An error occurred while validating your Login Attempt.",
        ex.status
      );
    }
  }

  async getUserDetails({ criteria, transaction }) {
    try {
      let user = await this.model.unscoped().findOne({
        attributes: {
          exclude: [
            "createdAt",
            "updatedAt",
            "deletedAt",
            "isEmailVerified",
            "isPhoneVerified",
            "createdBy",
            "updatedBy",
            "deletedBy",
          ],
        },
        where: criteria,
        include: [
          {
            model: this.role,
            as: "roles",
            attributes: {
              exclude: [
                "createdAt",
                "createdBy",
                "updatedAt",
                "updatedBy",
                "deletedAt",
                "deletedBy",
              ],
            },
            required: true,
            through: {
              where: {
                status: true,
              },
              attributes: [],
            },
            where: {
              status: true,
            },
          },
          {
            model: this.model,
            as: "createdByUser",
            attributes: ["id", "name", "phone", "email", "status"],
            required: false,
          },
          {
            model: this.model,
            as: "updatedByUser",
            attributes: ["id", "name", "phone", "email", "status"],
            required: false,
          },
        ],
        transaction: transaction,
      });
      if (user) {
        user = user.toJSON();
        const allRoles = user.roles;

        const rolesWithDetails = await Promise.all(
          allRoles.map(async (role) => {
            const resources = await this.resource.unscoped().findAll(
              {
                attributes: {
                  exclude: [
                    "createdAt",
                    "createdBy",
                    "updatedAt",
                    "updatedBy",
                    "deletedAt",
                    "deletedBy",
                  ],
                },
                where: {
                  status: true,
                },
                include: [
                  {
                    model: this.permission.unscoped(),
                    as: "roleResourcePermissions",
                    attributes: {
                      exclude: [
                        "createdAt",
                        "createdBy",
                        "updatedAt",
                        "updatedBy",
                        "deletedAt",
                        "deletedBy",
                      ],
                    },
                    where: {
                      status: true,
                    },
                    through: {
                      where: { roleID: role.id, status: true },
                      attributes: [], // To exclude the join table attributes
                    },
                  },
                ],
              },
              { transaction }
            );
            role.resources = resources;
            return role;
          })
        );

        const resources = await this.resource.unscoped().findAll(
          {
            attributes: {
              exclude: [
                "createdAt",
                "createdBy",
                "updatedAt",
                "updatedBy",
                "deletedAt",
                "deletedBy",
              ],
            },
            where: {
              status: true,
            },
            include: [
              {
                model: this.permission.unscoped(),
                as: "userResourcePermissions",
                attributes: {
                  exclude: [
                    "createdAt",
                    "createdBy",
                    "updatedAt",
                    "updatedBy",
                    "deletedAt",
                    "deletedBy",
                  ],
                },
                where: {
                  status: true,
                },
                through: {
                  where: { userID: user.id, status: true },
                  attributes: [], // To exclude the join table attributes
                },
              },
            ],
          },
          { transaction }
        );

        user.roles = rolesWithDetails;
        user.resources = resources;
      }

      return user;
    } catch (ex) {
      console.log("ex", ex);
      throw new baseError(ex);
    }
  }
}

module.exports = { user };
