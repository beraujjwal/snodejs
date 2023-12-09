const { controller } = require('./controller');
const { resource } = require('../services/resource.service');
const resourceService = new resource('Resource');
const { baseError } = require('../../system/core/error/baseError');

class resourcesController extends controller {
  /**
   * Controller constructor
   * @author Ujjwal Bera
   * @param null
   */
  constructor(service) {
    super(service);
    this.service = resourceService;
  }

  /**
   * @desc Fetching list of resources
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @author Ujjwal Bera
   */
  async resourcesList(req, transaction) {
    let result = await this.service.resourcesList(req.query, transaction);
    if (result) {
      return {
        code: 200,
        result,
        message: 'Resources list got successfully.'
      }
    }
    throw new baseError('Some error occurred while fetching list of resources.');
  }

  /**
   * @desc Fetching list of resources
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  async resourcesDDLList(req, transaction) {
    req.query.return_type = 'ddl';
    let result = await this.service.resourcesList(req.query, transaction);
    if (result) {
      return {
        code: 200,
        result,
        message: 'Resources list for DDL got successfully.'
      }
    }
    throw new baseError('Some error occurred while fetching list of roles.');
  }


  /**
   * @desc Store a new resource
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @author Ujjwal Bera
   */
  async resourceStore(req, transaction) {
    let { name, parent, rightsAvailable } = req.body;
    let result = await this.service.insert({ name, parent, rightsAvailable }, transaction);
    if (result) {

      return {
        code: 200,
        result,
        message: 'New resource created successfully.'
      }
    }
    throw new baseError('Some error occurred while creating new resource.');
  }

  /**
   * @desc Fetch detail of a resource
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @author Ujjwal Bera
   */
  async resourceDetails(req, transaction) {
    let resourceId = req.params.id;
    console.log(`resourceId=>${resourceId}`)
    let result = await this.service.resourceDetails(resourceId, transaction);
    if (result) {
      return res
        .status(200)
        .json(this.success(result, 'Resource details got successfully!'));
    }
    throw new baseError('Some error occurred while fetching resource details.');
  }

  /**
   * @desc Updated a resource
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @author Ujjwal Bera
   */
  async resourceUpdate(req, transaction) {
    let resourceId = req.params.id;
    let { name, status } = req.body;
    let result = await this.service.resourceUpdate(resourceId, { name, status}, transaction );
    if (result) {
      return res
        .status(200)
        .json(this.success(result, 'Resource details updated successfully!'));
    }
    throw new baseError('Some error occurred while updating resource details.');
  }

  /**
   * @desc Updated a resource
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @author Ujjwal Bera
   */
  async resourceStatusUpdate(req, transaction) {
    let resourceId = req.params.id;
    let { status } = req.body;
    let result = await this.service.resourceStatusUpdate(resourceId, status, transaction);
    if (result) {
      return res
        .status(200)
        .json(this.success(result, 'Resource details updated successfully!'));
    }
    throw new baseError('Some error occurred while updating resource details.');
  }

  /**
   * @desc Checking if it a deletable resource
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @author Ujjwal Bera
   */
  async isDeletableResource(req, transaction) {
    let resourceId = req.params.id;
    let result = await this.service.isDeletableResource(resourceId, transaction);
    if (result) {
      return res
        .status(200)
        .json(this.success(result, 'You can delete this resource!'));
    }
    throw new baseError('Some error occurred while deleting resource.');
  }

  /**
   * @desc Delete a resource
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @author Ujjwal Bera
   */
  async resourceDelete(req, transaction) {
    let resourceId = req.params.id;
    let result = await this.service.resourceDelete(resourceId, transaction);
    if (result) {
      return res
        .status(200)
        .json(this.success(result, 'Resource deleted successfully!'));
    }
    throw new baseError('Some error occurred while deleting resource.');
  }
}
module.exports = new resourcesController(resourceService);
