const express = require('express');
require('express-router-group');
const rolesController = require('../app/controllers/roles.controller');
const roleValidation = require('../app/validations/role.validation');
const authMiddleware = require('../app/middlewares/auth.middleware');
const aclMiddleware = require('../app/middlewares/acl.middleware');

const { exceptionHandler } = require('../app/middlewares/exceptionHandler.middleware');

const router = express.Router();

router.group('/v1.0', (versionRouter) => {


  versionRouter.get('/roles', /*authMiddleware.verifyToken,*/ exceptionHandler(rolesController.allRolesList));
  versionRouter.get( '/roles-ddl', [authMiddleware.verifyToken, aclMiddleware.hasPermission('dropDownList', 'role-section')], exceptionHandler(rolesController.rolesDDLList) );

  versionRouter.group('/role', (roleRouter) => {
    roleRouter.post(
      '',
      [
        aclMiddleware.hasPermission('createNew', 'role-section'),
        roleValidation.create,
      ],
      exceptionHandler(rolesController.roleStore)
    );

    roleRouter.get(
      '/:id',
      [aclMiddleware.hasPermission('singleDetailsView', 'role-section')],
      exceptionHandler(rolesController.roleDetails)
    );

    roleRouter.put(
      '/:id',
      [
        aclMiddleware.hasPermission('updateExisting', 'role-section'),
        roleValidation.update,
      ],
      exceptionHandler(rolesController.roleUpdate)
    );

    roleRouter.delete(
      '/:id',
      [aclMiddleware.hasPermission('deleteExisting', 'role-section')],
      exceptionHandler(rolesController.roleDelete)
    );
  });


});

module.exports = router;
