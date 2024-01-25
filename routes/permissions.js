const express = require('express');
require('express-router-group');
const permissionsController = require('../app/controllers/permissions.controller');
const permissionValidation = require('../app/validations/permission.validation');
const authMiddleware = require('../app/middlewares/auth.middleware');
const aclMiddleware = require('../app/middlewares/acl.middleware');

const { exceptionHandler } = require('../app/middlewares/exceptionHandler.middleware');
const router = express.Router();

router.group('/v1.0', (versionRouter) => {

  versionRouter.get('/permissions', /*[authMiddleware.verifyToken, aclMiddleware.hasPermission('listView', 'permission-section')],*/ exceptionHandler(permissionsController.findAll));
  versionRouter.get( '/permissions-ddl', [authMiddleware.verifyToken, aclMiddleware.hasPermission('dropDownList', 'permission-section')], exceptionHandler(permissionsController.permissionsDDLList) );

  versionRouter.group('/permission', authMiddleware.verifyToken, (permissionRouter) => {
    permissionRouter.post(
      '',
      [
        aclMiddleware.hasPermission('createNew', 'permission-section'),
        permissionValidation.create,
      ],
      exceptionHandler(permissionsController.create)
    );

    permissionRouter.get(
      '/:id',
    [ aclMiddleware.hasPermission('singleDetailsView', 'permission-section') ],
      exceptionHandler(permissionsController.findByPk)
    );

    permissionRouter.put(
      '/:id',
      [
        aclMiddleware.hasPermission('updateExisting', 'permission-section'),
        permissionValidation.update,
      ],
      exceptionHandler(permissionsController.updateByPk)
    );

    permissionRouter.delete(
      '/:id',
      [aclMiddleware.hasPermission('deleteExisting', 'permission-section')],
      exceptionHandler(permissionsController.deleteByPk)
    );
  });

});

module.exports = router;
