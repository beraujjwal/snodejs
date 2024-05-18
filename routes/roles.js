const express = require("express");
require("express-router-group");
const rolesController = require("../app/controllers/roles.controller");
const roleValidation = require("../app/validations/role.validation");
const authMiddleware = require("../app/middlewares/auth.middleware");
const aclMiddleware = require("../app/middlewares/acl.middleware");

const {
  exceptionHandler,
} = require("../app/middlewares/exceptionHandler.middleware");

const router = express.Router();

router.group("/v1.0", (versionRouter) => {
  versionRouter.get(
    "/roles",
    [
      authMiddleware.verifyToken,
      aclMiddleware.hasPermission("list-view", "role-section"),
    ],
    exceptionHandler(rolesController.findAll)
  );
  versionRouter.get(
    "/roles-ddl",
    [
      authMiddleware.verifyToken,
      aclMiddleware.hasPermission("dropDownList", "role-section"),
    ],
    exceptionHandler(rolesController.rolesDDLList)
  );

  versionRouter.group("/role", (roleRouter) => {
    roleRouter.post(
      "",
      [
        authMiddleware.verifyToken,
        aclMiddleware.hasPermission("createNew", "role-section"),
        roleValidation.create,
      ],
      exceptionHandler(rolesController.insert)
    );

    roleRouter.get(
      "/:id",
      [
        authMiddleware.verifyToken,
        aclMiddleware.hasPermission("singleDetailsView", "role-section"),
      ],
      exceptionHandler(rolesController.roleDetails)
    );

    roleRouter.put(
      "/:id",
      [
        authMiddleware.verifyToken,
        aclMiddleware.hasPermission("updateExisting", "role-section"),
        roleValidation.update,
      ],
      exceptionHandler(rolesController.roleUpdate)
    );

    roleRouter.delete(
      "/:id",
      [
        authMiddleware.verifyToken,
        aclMiddleware.hasPermission("deleteExisting", "role-section"),
        roleValidation.canDelete,
      ],
      exceptionHandler(rolesController.deleteByPk)
    );
  });
});

module.exports = router;
