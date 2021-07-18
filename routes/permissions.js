const Auth = require("../app/middleware/AuthMiddleware");
const Permission = require("../app/middleware/PermissionMiddleware");
const Acl = require("../app/middleware/AclMiddleware");
const Permissions = require("../app/controllers/PermissionsController");

module.exports = function(app, router) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  /*app.get("/api/test/all", UsersController.allAccess);*/

  app.get(
    "/api/admin/permissions",
    [Auth.verifyToken, Acl.hasPermission('permissions', 'READ')], 
    Permissions.adminPermissions
  );

  app.post(
    "/api/admin/permission/store",
    [Auth.verifyToken, Acl.hasPermission('permissions', 'OWN_READ_WRITE')], 
    Permissions.adminStorePermission
  );

  app.get(
    "/api/admin/permission/details/:id",
    [Auth.verifyToken, Acl.hasPermission('permissions', 'READ')], 
    Permissions.adminDetailsPermission
  );

  app.put(
    "/api/admin/permission/update/:id",
    [Auth.verifyToken, Acl.hasPermission('permissions', 'OWN_READ_WRITE')],
    Permissions.adminUpdatePermission
  );

  app.delete(
    "/api/admin/permission/delete/:id",
    [Auth.verifyToken, Acl.hasPermission('permissions', 'OWN_READ_WRITE')],
    Permissions.adminDeletePermission
  );
};