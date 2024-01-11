'use strict';
const { validation } = require('./validation');

class resourceValidation extends validation {
  /**
   * Resource validation constructor
   * @author Ujjwal Bera
   * @param null
   */
  constructor() {
    super();
    this.RoleResourcePermission = this.db['RoleResourcePermission'];
    this.UserResourcePermission = this.db['UserResourcePermission'];
  }

  async create(req, res, next) {
    const validationRule = {
      parent: 'string|exists:Resource,id',
      name: 'required|string',
    };
    return await this.validate(req, res, next, validationRule);
  }

  async update(req, res, next) {
    const validationRule = {
      parent: 'string|exists:Resource,id',
      name: 'required|string',
      status: 'required|boolean',
    };
    return await this.validate(req, res, next, validationRule);
  }

  async canDelete(req, res, next) {
    const resourceID = req.params.id;
    const validationError = [];
    const roleResourcePermissions = await this.RoleResourcePermission.findAll({
      where: {
        resourceID
      }
    });
    if(roleResourcePermissions.length > 0) validationError.errors = 'Resource already assigned to some role. First unassign them first';

    if(!validationError?.errors) {
      const userResourcePermissions = await this.UserResourcePermission.findAll({
        where: {
          resourceID
        }
      });
      if(userResourcePermissions.length > 0) validationError.errors = 'Resource already assigned to some user. First unassign them first';
    }


    return await this.customValidationError(req, res, next, validationError);
  }
}
module.exports = new resourceValidation();
