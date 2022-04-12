'use strict';
const jwt = require('jsonwebtoken');
const autoBind = require('auto-bind');
const { middleware } = require('./middleware');

class authMiddleware extends middleware {



  /**
   * Controller constructor
   * @author Ujjwal Bera
   * @param null
   */
  constructor( ) {
      super( );
      this.User = this.db.User;
      this.Role = this.db.Role;
      autoBind( this );
  }

  async checkDuplicateUsernameOrEmail(req, res, next) {

    // Phone
    this.User.findOne({
      where: {
        phone: req.body.phone
      }
    }).then(user => {
      if (user) {
        return res.status(400).send({
          message: "Failed! Phone number is already in use!"
        });
      }

      if(req.body.email !='' || req.body.email !=null) {
        // Email
        this.User.findOne({
          where: {
            email: req.body.email
          }
        }).then(user => {
          if (user) {
            return res.status(400).send({
              message: "Failed! Email is already in use!"
            });
          }
        });
      }
      next();
    });
  };



  /**
   * @description Check Roles Existed
   * @param req {object} Object containing all required fields to do user login
   * @param res {object} Object containing all required fields to do user login
   * @returns {Promise<{message: string}|{message: string}>}
   */
  async checkRolesExisted(req, res, next) {
    if (req.body.roles) {
      for (let i = 0; i < req.body.roles.length; i++) {
        this.Role.findOne({
          where: {slug: req.body.roles[i]},
        }).then(role => {

            if (!role) {
              return res.status(404).send({ message: "Failed! Role does not exist = " + req.body.roles[i] });
            }

          })
          .catch(err => {
            return res.status(500).send({ message: err.message });
          });
      }
    }

    next();
  };

  async verifyToken(req, res, next) {
    let token = req.headers["x-access-token"];

    if (!token) {
      return res.status(403).send({
        message: "No token provided!"
      });
    }

    jwt.verify(token, this.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: "Unauthorized!"
        });
      }
      req.user_id = decoded.id;
      //req.user = this.User.findByPk(decoded.id, {include: ['roles']});
      this.User.findByPk(decoded.id, {include: ['roles']}).then(user => {
        if (!user) {
          return res.status(403).send({
            message: "Permission denied!"
          });
        }
        req.user = JSON.parse(JSON.stringify(user));
        next();
        return;
      }).catch(err => {
        next(new Error(err));
      });
    });
  };

  async isAdmin(req, res, next) {

    var user = req.user;
    var roles = user.roles;
    if(roles.find(x => x.slug === 'admin')) {
      next();
      return;
    }
    return res.status(403).send({
      message: "Permission denied!"
    });

  };

  async isVendor(req, res, next) {

    var user = req.user;
    var roles = user.roles;
    if(roles.find(role => role.slug === 'vendor')) {
      next();
      return;
    }
    return res.status(403).send({
      message: "Permission denied!"
    });

  };

  async isVendorOrAdmin(req, res, next) {
    var user = req.user;
    var roles = user.roles;
    if(roles.find(role => role.slug === 'admin')) {
      next();
      return;
    }

    if(roles.find(role => role.slug === 'vendor')) {
      next();
      return;
    }

    return res.status(403).send({
      message: "Permission denied!"
    });
  };

  async isLoggedIn(req, res, next) {
    if(req.session.loggedin === true && req.session.user !== 'undefined') {
      req.user = JSON.parse(JSON.stringify(req.session.user));
      next();
      return;
    }

    req.flash('error', 'Permission denied!')
    res.redirect('/auth/signin')
  };

}

module.exports = new authMiddleware( );