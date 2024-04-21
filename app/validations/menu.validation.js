"use strict";
const { validation } = require("./validation");

class menuValidation extends validation {
  /**
   * Validation constructor
   * @author Ujjwal Bera
   * @param null
   */
  constructor() {
    super();
    this.UserMenu = this.getModel("UserMenu");
  }

  async create(req, res, next) {
    const validationRule = {
      parent: "string|exists:Menu,slug",
      //resources: 'required|multipleExists:Resource,id,',
      name: "required|string",
    };
    return await this.validate(req, res, next, validationRule);
  }

  async update(req, res, next) {
    const menuId = req.user.id;
    const validationRule = {
      parent: "string|exists:Menu,slug",
      name: "required|string",
      //resources: 'required|multipleExists',
      status: "required|boolean",
    };
    return await this.validate(req, res, next, validationRule);
  }

  async canDelete(req, res, next) {
    const menuId = req.params.id;
    const validationError = [];
    const menuUsers = await this.UserMenu.findAll({
      where: {
        menuId,
      },
    });
    if (menuUsers.length > 0)
      validationError.errors = "Some users are already assign to this menu.";

    return await this.customValidationError(req, res, next, validationError);
  }
}
module.exports = new menuValidation();
