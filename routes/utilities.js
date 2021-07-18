const UtilitiesController = require("../app/controllers/UtilitiesController");
const Auth = require("../app/middleware/AuthMiddleware");

module.exports = function(app, router) {

  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.use('/utilities', router);

  app.get(
    "/get-countries",
    UtilitiesController.get_countries
  );

  app.get(
    "/:country_id/get-states",
    UtilitiesController.get_states
  );

  app.get(
    "/:state_id/get-cities",
    //[authJwt.verifyToken],
    UtilitiesController.get_cities
  );
};
