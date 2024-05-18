"use strict";
const controller = require("./controller");
const user = require("../services/user.service");
const { baseError } = require("../../system/core/error/baseError");
const userService = user.getInstance("User"); //new user("User");

const { generateSecret, verifyToken } = require("../../helpers/speakeasy");

class UsersController extends controller {
  /**
   * Controller constructor
   * @author Ujjwal Bera
   * @param null
   */
  constructor(service) {
    super(service);
  }

  static getInstance(service) {
    if (!this.instance) {
      this.instance = new UsersController(service);
    }
    return this.instance;
  }

  /**
   * @desc get 2 factor code
   * @param {*} req
   */
  async get2FACode(req, transaction) {
    const result = await generateSecret(req.user.name.split(" ")[0]);
    console.log("result", result);
    const { base32, otpauth_url } = result;
    if (result) {
      return {
        code: 200,
        result,
        message: "Two Factor Auth barcode!",
      };
    }
    throw new baseError("Uable to generate 2FA Barcode.", 401);
  }

  /**
   * @desc get 2 factor code
   * @param {*} req
   */
  async verify2FACode(req, transaction) {
    const { token, password } = req.body;

    const result = await verifyToken("M4YD4SSHOZBGQOJZLBNUC6DJFA", token);
    if (result) {
      return {
        code: 200,
        result,
        message: "Two Factor verified successfully",
      };
    }
    throw new baseError("Unable to verify code.", 401);
  }
}

module.exports = UsersController.getInstance(userService);
