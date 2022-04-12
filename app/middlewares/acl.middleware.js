'use strict';
const autoBind = require('auto-bind');
const { middleware } = require('./middleware');

class aclMiddleware extends middleware {


  /**
   * Controller constructor
   * @author Ujjwal Bera
   * @param null
   */
  constructor( ) {
      super( );
      this.User = this.db.User;
      autoBind( this );
  }


  haveAccess(action, access) {
    var userModel = this.db.User;
    var roleModel = this.db.Role;
    var permissionModel = this.db.Permission;
    return function(req, res, next) {

      var user = req.user;
      var havePermission = false;
      var permissionSet = {};
      if(access == 'READ') {
        permissionSet = ['READ', 'READ_WRITE'];
      } else {
        permissionSet = ['READ_WRITE'];
      }

      var data = userModel.findOne({
        //raw: true,
        where: {
          phone: req.user.phone,
          email: req.user.email,
          status: true,
          verified: true
        },
        include: [
        {
            model: roleModel,
            as: 'roles',
            required: true,
            include: [
              {
                model: permissionModel,
                as: 'permissions',
                required: false,
                where: { slug: action }
              }
            ]
        },
        {
            model: permissionModel,
            as: 'permissions',
            required: false,
            where: { slug: action }
        }
        ]
      }).then(user => {

        var roles = JSON.parse(JSON.stringify(user.roles));
        var permissions = JSON.parse(JSON.stringify(user.permissions));

        let permissionValue = [];
        permissionValue['READ'] = 0;
        permissionValue['OWN_READ_WRITE'] = 1;
        permissionValue['READ_WRITE'] = 2;


        permissions.forEach(permission => {
          if(permissionValue[access] <= permissionValue[permission.UserPermission.permission]) {
            havePermission = true;
          }
        });

        roles.forEach(role => {
          var permissions = JSON.parse(JSON.stringify(role.permissions));
          permissions.forEach(permission => {
            if(permissionValue[access] <= permissionValue[permission.RolePermission.permission]) {
              havePermission = true;
            }
          })
        });

        if(havePermission == false) {
          return res.status(404).send({ message: __('USER_PERMISSION_DENIED') });
        } else next();
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });

    }
  }


  hasPermission(action, access) {
    var userModel = this.db.User;
    var roleModel = this.db.Role;
    var permissionModel = this.db.Permission;
    return function(req, res, next) {

      var user = req.user;
      var havePermission = false;
      var permissionSet = {};
      if(access == 'READ') {
        permissionSet = ['READ', 'READ_WRITE'];
      } else {
        permissionSet = ['READ_WRITE'];
      }

      var data = userModel.findOne({
        //raw: true,
        where: {
          phone: req.user.phone,
          email: req.user.email,
          status: true,
          verified: true
        },
        include: [
        {
            model: roleModel,
            as: 'roles',
            required: true,
            include: [
              {
                model: permissionModel,
                as: 'permissions',
                required: false,
                where: { slug: action }
              }
            ]
        },
        {
            model: permissionModel,
            as: 'permissions',
            required: false,
            where: { slug: action }
        }
        ]
      }).then(user => {

        var roles = JSON.parse(JSON.stringify(user.roles));
        var permissions = JSON.parse(JSON.stringify(user.permissions));

        let permissionValue = [];
        permissionValue['READ'] = 0;
        permissionValue['OWN_READ_WRITE'] = 1;
        permissionValue['READ_WRITE'] = 2;


        permissions.forEach(permission => {
          if(permissionValue[access] <= permissionValue[permission.UserPermission.permission]) {
            havePermission = true;
          }
        });

        roles.forEach(role => {
          var permissions = JSON.parse(JSON.stringify(role.permissions));
          permissions.forEach(permission => {
            if(permissionValue[access] <= permissionValue[permission.RolePermission.permission]) {
              havePermission = true;
            }
          })
        });

        if(havePermission == false) {
          return res.status(404).send({ message: __('USER_PERMISSION_DENIED') });
        } else next();
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });

    }
  }

}

module.exports = new aclMiddleware( );