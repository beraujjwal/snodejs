const express = require("express");
require("express-router-group");
const menusController = require("../app/controllers/menus.controller");
const menuValidation = require("../app/validations/menu.validation");
const authMiddleware = require("../app/middlewares/auth.middleware");
const aclMiddleware = require("../app/middlewares/acl.middleware");

const {
  exceptionHandler,
} = require("../app/middlewares/exceptionHandler.middleware");

const router = express.Router();

router.group("/v1.0", (versionRouter) => {
  versionRouter.get(
    "/menus",
    [
      authMiddleware.verifyToken,
      aclMiddleware.hasPermission("listView", "menu-section"),
    ],
    exceptionHandler(menusController.getAll)
  );
  versionRouter.get(
    "/menus-ddl",
    [
      authMiddleware.verifyToken,
      aclMiddleware.hasPermission("dropDownList", "menu-section"),
    ],
    exceptionHandler(menusController.menusDDLList)
  );

  versionRouter.group("/menu", (menuRouter) => {
    menuRouter.post(
      "",
      [
        authMiddleware.verifyToken,
        aclMiddleware.hasPermission("createNew", "menu-section"),
        menuValidation.create,
      ],
      exceptionHandler(menusController.insert)
    );

    menuRouter.get(
      "/:id",
      [
        authMiddleware.verifyToken,
        aclMiddleware.hasPermission("singleDetailsView", "menu-section"),
      ],
      exceptionHandler(menusController.menuDetails)
    );

    menuRouter.put(
      "/:id",
      [
        authMiddleware.verifyToken,
        aclMiddleware.hasPermission("updateExisting", "menu-section"),
        menuValidation.update,
      ],
      exceptionHandler(menusController.menuUpdate)
    );

    menuRouter.delete(
      "/:id",
      [
        authMiddleware.verifyToken,
        aclMiddleware.hasPermission("deleteExisting", "menu-section"),
        menuValidation.canDelete,
      ],
      exceptionHandler(menusController.deleteByPk)
    );
  });
});

module.exports = router;
