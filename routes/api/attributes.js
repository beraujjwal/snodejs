const Auth = require("../../app/middleware/AuthMiddleware");
const AttributeMiddleware = require("../../app/middleware/AttributeMiddleware");
const Acl = require("../../app/middleware/AclMiddleware");
const AttributesController = require("../../app/controllers/AttributesController");

module.exports = function(app, router) {

  //var router         = app.Router();


  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  //app.prefix('/api', function (router) {
    app.get(
      "/api/admin/attributes", 
      [Auth.verifyToken, Acl.hasPermission('attributes', 'READ')], 
      AttributesController.adminAttributesListApi
    );
  //});

  app.post(
    "/api/admin/attribute/store",
    [Auth.verifyToken, Acl.hasPermission('attributes', 'OWN_READ_WRITE')],
    AttributesController.adminStoreAttribute
  );

  app.get(
    "/api/admin/attribute/details/:id",
    [Auth.verifyToken, Acl.hasPermission('attributes', 'READ')], 
    AttributesController.adminAttributeDetailsApi
  );

  app.put(
    "/api/admin/attribute/update/:id",
    [Auth.verifyToken, Acl.hasPermission('attributes', 'OWN_READ_WRITE')],
    AttributesController.adminUpdateAttribute
  );

  app.delete(
    "/api/admin/attribute/delete/:id",
    [Auth.verifyToken, Acl.hasPermission('attributes', 'OWN_READ_WRITE')],
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