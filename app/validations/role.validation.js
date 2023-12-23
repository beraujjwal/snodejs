'use strict';
const { validation } = require('./validation');

class roleValidation extends validation {
  /**
   * Validation constructor
   * @author Ujjwal Bera
   * @param null
   */
  constructor() {
    super();
    this.UserRole = this.db['UserRole'];
  }

  async create(req, res, next) {
    const validationRule = {
      parent: 'string|exists:Role,slug',
      //resources: 'required|multipleExists:Resource,id,',
      name: 'required|string',
    };
    return await this.validate(req, res, next, validationRule);
  }

  async update(req, res, next) {
    const roleId = req.user.id;
    const validationRule = {
      parent: 'string|exists:Role,slug',
      name: 'required|string',
      //resources: 'required|multipleExists',
      status: 'required|boolean',
    };
    return await this.validate(req, res, next, validationRule);
  }

  async canDelete(req, res, next) {
    const roleId = req.params.id;
    const validationError = [];
    const roleUsers = await this.UserRole.findAll({
      where: {
        roleId
      }
    });
    if(roleUsers.length > 0) validationError.errors = 'Some users are already assign to this role.';

    return await this.customValidationError(req, res, next, validationError);
  }
}
module.exports = new roleValidation();
