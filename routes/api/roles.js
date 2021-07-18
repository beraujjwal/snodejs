const Auth = require("../../app/middleware/AuthMiddleware");
const Role = require("../../app/middleware/RoleMiddleware");
const Acl = require("../../app/middleware/AclMiddleware");
const Roles = require("../../app/controllers/RolesController");

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
    "/api/admin/roles",
    [Auth.verifyToken, Acl.hasPermission('roles', 'READ')], 
    Roles.adminRoles
  );

  app.post(
    "/api/admin/role/store",
    [Auth.verifyToken, Acl.hasPermission('roles', 'OWN_READ_WRITE')], 
    Roles.adminStoreRole
  );

  app.get(
    "/api/admin/role/details/:id",
    [Auth.verifyToken, Acl.hasPermission('roles', 'READ')], 
    Roles.adminDetailsRole
  );

  app.put(
    "/api/admin/role/update/:id",
    [Auth.verifyToken, Acl.hasPermission('roles', 'OWN_READ_WRITE')],
    Roles.adminUpdateRole
  );

  app.delete(
    "/api/admin/role/delete/:id",
    [Auth.verifyToken, Acl.hasPermission('roles', 'OWN_READ_WRITE')],
    Roles.adminDeleteRole
  );
};