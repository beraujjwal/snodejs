const Auth = require("../app/middleware/AuthMiddleware");
const AuthMiddleware = require("../app/middleware/AuthMiddleware");
const AttributeMiddleware = require("../app/middleware/AttributeMiddleware");
const Acl = require("../app/middleware/AclMiddleware");
const AttributesController = require("../app/controllers/AttributesController");
const attributeValidation = require("../app/validation/attributeValidation");
let formData = require('../system/helpers/formData');

module.exports = function(app, router) {

  //var router         = app.Router();


  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // add flushSystem as middleware
  app.use(formData());

  app.get(
    "/admin/attributes",
    [AuthMiddleware.isLoggedIn],
    AttributesController.adminShowAttributesList
  );

  app.get(
    "/admin/attribute/view/:id",
    [AuthMiddleware.isLoggedIn],
    AttributesController.adminAttributeDetails
  );

  app.get(
    "/admin/attribute/add",
    [AuthMiddleware.isLoggedIn],
    AttributesController.adminAddAttribute
  );

  app.post(
    "/admin/attribute/store",
    [AuthMiddleware.isLoggedIn, attributeValidation.attributeWebStoreValidation],
    AttributesController.adminStoreAttribute
  );

  app.get(
    "/admin/attribute/edit/:id",
    [AuthMiddleware.isLoggedIn],
    AttributesController.adminEditAttribute
  );

  app.post(
    "/admin/attribute/update/:id",
    [AuthMiddleware.isLoggedIn, attributeValidation.attributeWebUpdateValidation],
    AttributesController.adminUpdateAttribute
  );

  app.post(
    "/api/admin/attribute/store",
    [AuthMiddleware.isLoggedIn],
    AttributesController.adminStoreAttribute
  );

  app.get(
    "/api/admin/attribute/details/:id",
    [AuthMiddleware.isLoggedIn],
    AttributesController.adminAttributeDetails
  );

  app.put(
    "/api/admin/attribute/update/:id",
    [AuthMiddleware.isLoggedIn],
    AttributesController.adminUpdateAttribute
  );

  app.delete(
    "/api/admin/attribute/delete/:id",
    [AuthMiddleware.isLoggedIn],
    AttributesController.adminDeleteAttribute
  );

  /*app.get(
    "/api/admin/mod",
    [Auth.verifyToken, Auth.isVendor],
    AttributesController.moderatorBoard
  );

  app.get(
    "/api/admin/admin",
    [Auth.verifyToken, Auth.isAdmin],
    AttributesController.adminBoard
  );*/
};