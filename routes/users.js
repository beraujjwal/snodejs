const AuthMiddleware = require("../app/middleware/AuthMiddleware");
const UserValidation = require("../app/validation/userValidation");
const AuthController = require("../app/controllers/auth/AuthController");
const UsersController = require("../app/controllers/UsersController");
let formData = require('../system/helpers/formData');

module.exports = function(app, router) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );    
    next();
  });

  // add flushSystem as middleware
  app.use(formData());

  //app.use('/v1', router);

  app.all('/', function (req, res, next) {
    console.log('Accessing the secret section ...');
    res.render('index', { title: 'Home Page', msg: 'Welcome to e-Shop Admin' })
  });


  app.get(
    "/auth/signup",
    AuthController.signupForm
  );

  app.post(
    "/auth/signup",    
    [UserValidation.signupWebValidation],
    AuthController.signupProcess
  );

  app.get(
    "/auth/signin",
    AuthController.signinForm
  );

  app.post(
    "/auth/signin",
    [
      UserValidation.signinWebValidation
    ],
    AuthController.signinProcess
  );

  app.get(
    "/auth/active/:username/:token",
    AuthController.activateProcess
  );

  app.get(
    "/auth/forget-password",
    AuthController.forgetPasswordForm
  );

  app.get(
    "/admin/dashboard",
    [AuthMiddleware.isLoggedIn],
    UsersController.dashboard
  );

  app.get(
    "/admin/users",
    [AuthMiddleware.isLoggedIn],
    UsersController.adminUsers
  );

  app.get(
    "/admin/user/add",
    [AuthMiddleware.isLoggedIn],
    UsersController.adminAddUser
  );

  app.post(
    "/admin/user/add",
    [AuthMiddleware.isLoggedIn],
    UsersController.adminStoreUser
  );

  app.get(
    "/admin/user/edit/:id",
    [AuthMiddleware.isLoggedIn],
    UsersController.adminEditUser
  );

  app.post(
    "/admin/user/edit/:id",
    [AuthMiddleware.isLoggedIn],
    UsersController.adminUpdateUser
  );

  app.get(
    "/admin/user/delete/:id",
    [AuthMiddleware.isLoggedIn],
    UsersController.adminDeleteUser
  );


};
