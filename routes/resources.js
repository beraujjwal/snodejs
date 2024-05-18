const express = require("express");
require("express-router-group");
const resourcesController = require("../app/controllers/resources.controller");
const resourceValidation = require("../app/validations/resource.validation");
const authMiddleware = require("../app/middlewares/auth.middleware");
const aclMiddleware = require("../app/middlewares/acl.middleware");

const {
  exceptionHandler,
} = require("../app/middlewares/exceptionHandler.middleware");

const router = express.Router();

router.group("/v1.0", (versionRouter) => {
  versionRouter.get(
    "/resources",
    [
      authMiddleware.verifyToken,
      aclMiddleware.hasPermission("list-view", "resource-section"),
    ],
    exceptionHandler(resourcesController.findAll)
  );
  versionRouter.get(
    "/resources-ddl",
    [
      authMiddleware.verifyToken,
      aclMiddleware.hasPermission("dropDownList", "resource-section"),
    ],
    exceptionHandler(resourcesController.resourcesDDLList)
  );

  versionRouter.group(
    "/resource",
    authMiddleware.verifyToken,
    (resourceRouter) => {
      resourceRouter.post(
        "",
        [
          aclMiddleware.hasPermission("createNew", "resource-section"),
          resourceValidation.create,
        ],
        exceptionHandler(resourcesController.create)
      );

      resourceRouter.get(
        "/:id",
        [aclMiddleware.hasPermission("singleDetailsView", "resource-section")],
        exceptionHandler(resourcesController.findByPk)
      );

      resourceRouter.put(
        "/:id",
        [
          aclMiddleware.hasPermission("updateExisting", "resource-section"),
          resourceValidation.update,
        ],
        exceptionHandler(resourcesController.updateByPk)
      );

      resourceRouter.delete(
        "/:id",
        [aclMiddleware.hasPermission("deleteExisting", "resource-section")],
        exceptionHandler(resourcesController.deleteByPk)
      );
    }
  );
});

module.exports = router;
