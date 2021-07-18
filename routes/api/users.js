const AuthMiddleware = require("../../app/middleware/AuthMiddleware");
const UserValidation = require("../../app/validation/userValidation");
const AuthController = require("../../app/controllers/auth/AuthController");
const UsersController = require("../../app/controllers/UsersController");

module.exports = function(app, router) {

  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.use('/api/v1', router);

  router.post(
    "/auth/signup",
    [
      UserValidation.signupValidation,
      AuthMiddleware.checkDuplicateUsernameOrEmail,
      AuthMiddleware.checkRolesExisted
    ],
    AuthController.signup
  );


  router.post(
    "/auth/signin",
    [
      UserValidation.signinValidation
    ],
    AuthController.signin
  );

  /*router.get(
    "/auth/active/:username/:token",
    AuthController.activate
  );*/

  router.get(
    "/admin/dashboard", 
    UsersController.dashboard
  );

  router.get(
    "/admin/users", 
    UsersController.adminUsers
  );

  router.get(
    "/admin/user/add", 
    UsersController.adminAddUser
  );

  router.post(
    "/admin/user/add", 
    UsersController.adminStoreUser
  );

  router.get(
    "/admin/user/edit/:id", 
    UsersController.adminEditUser
  );

  router.post(
    "/admin/user/edit/:id", 
    UsersController.adminUpdateUser
  );

  router.get(
    "/admin/user/delete/:id", 
    UsersController.adminDeleteUser
  );
  
};