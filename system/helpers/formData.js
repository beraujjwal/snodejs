function formData() {
    return function (req, res, next) {

      // Check for sessions
      if (!req.session) {
        throw new Error("flushSystem must have sessions enabled");
      }
      //req.locals.formData = []
      // INIT messages array 
      if (!req.session.formData) {
        req.session.formData = [];
      }
      if(req.method == 'POST' || req.method == 'PUT') {
        req.session.formData = req.body;    
      } else if(req.method == 'GET') {
        req.locals = { formData: req.session.formData } ;
        req.session.formData = [];
      }

      next();
    };
  }
  // export middleware
  module.exports = formData;