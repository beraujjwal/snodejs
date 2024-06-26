'use strict';
const { validation } = require('./validation');

class userValidation extends validation {
  /**
   * Validation constructor
   * @author Ujjwal Bera
   * @param null
   */
  constructor() {
    super();
    this.regexEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  }

  async signup(req, res, next) {
    const validationRule = {
      name: 'required|string',
      email: 'required|email',
      phone: 'required|numeric',
      password: 'required|string|strict|min:6',
      role: 'string|exists:Role,slug'
    };
    //return await this.validate(req, res, next, validationRule);
    console.log('Calling Validation');
    return await this.validate(req, res, next, validationRule);
  }

  async verify(req, res, next) {
    let rule = req.body.username.match(this.regexEmail)
      ? 'required|email'
      : 'required|numeric';
    const validationRule = {
      username: rule,
    };
    return await this.validate(req, res, next, validationRule);
  }

  async signin(req, res, next) {

    const validationRule = {
      username: 'required',
      password: 'required',
    };
    return await this.validate(req, res, next, validationRule);
  }

  async profile(req, res, next) {
    const userId = req.user.id;
    const validationRule = {
      name: 'required|string',
      email: 'required|email|unique:User,email,_id,' + userId,
      phone: 'required|string|unique:User,phone,_id,' + userId,
    };
    return await this.validate(req, res, next, validationRule);
  }

  async forgotPassword(req, res, next) {
    const validationRule = {
      username: 'required',
    };
    return await this.validate(req, res, next, validationRule);
  }

  async changePassword(req, res, next) {
    const validationRule = {
      old_password: 'required',
      password: 'required',
      password_confirmation: 'required',
    };
    return await this.validate(req, res, next, validationRule);
  }
}
module.exports = new userValidation();
