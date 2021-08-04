'use strict';
const autoBind = require( 'auto-bind' );
const { Middleware } = require( './Middleware' );

class AclMiddleware extends Middleware {


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
    const userModel = this.db.User;
    const roleModel = this.db.Role;
    const permissionModel = this.db.Permission;
    return function(req, res, next) {
      
      let user = req.user;
      let havePermission = false;
      let permissionSet = {};
      if(access == 'READ') {
        permissionSet = ['READ', 'READ_WRITE'];
      } else {
        permissionSet = ['READ_WRITE'];
      }

      let data = userModel.findOne({
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

        let roles = JSON.parse(JSON.stringify(user.roles));
        let permissions = JSON.parse(JSON.stringify(user.permissions));

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
          let permissions = JSON.parse(JSON.stringify(role.permissions));
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
    const userModel = this.db.User;
    const roleModel = this.db.Role;
    const permissionModel = this.db.Permission;
    return function(req, res, next) {
      
      let user = req.user;
      let havePermission = false;
      let permissionSet = {};
      if(access == 'READ') {
        permissionSet = ['READ', 'READ_WRITE'];
      } else {
        permissionSet = ['READ_WRITE'];
      }

      let data = userModel.findOne({
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

        let roles = JSON.parse(JSON.stringify(user.roles));
        let permissions = JSON.parse(JSON.stringify(user.permissions));

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
          let permissions = JSON.parse(JSON.stringify(role.permissions));
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

module.exports = new AclMiddleware( );