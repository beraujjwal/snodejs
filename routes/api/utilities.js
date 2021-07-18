const UtilitiesController = require("../../app/controllers/UtilitiesController");
const AuthMiddleware = require("../../app/middleware/AuthMiddleware");

module.exports = function(app, router) {

  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.use('/api/utilities/v1', router);

  router.get(
    "/get-countries",
    UtilitiesController.get_countries
  );

  router.get(
    "/:country_id/get-states",
    UtilitiesController.get_states
  );

  router.get(
    "/:state_id/get-cities",
    UtilitiesController.get_cities
  );
};