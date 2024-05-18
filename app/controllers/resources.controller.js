const controller = require("./controller");
const resource = require("../services/resource.service");
const resourceService = resource.getInstance("Resource"); //new resource("Resource");
const { baseError } = require("../../system/core/error/baseError");

class ResourcesController extends controller {
  /**
   * Controller constructor
   * @author Ujjwal Bera
   * @param null
   */
  constructor(service) {
    super(service);
  }

  static getInstance(service) {
    if (!this.instance) {
      this.instance = new ResourcesController(service);
    }
    return this.instance;
  }

  /**
   * @desc Fetching list of resources
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @author Ujjwal Bera
   */
  async findAll(req, transaction) {
    console.log("transaction", transaction);
    const result = await resourceService.findAll(req.query, transaction);
    if (result) {
      return {
        code: 200,
        result,
        message: "Resources list got successfully.",
      };
    }
    throw new baseError(
      "Some error occurred while fetching list of resources."
    );
  }

  /**
   * @desc Fetching list of resources
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  async resourcesDDLList(req, transaction) {
    req.query.return_type = "ddl";
    let result = await resourceService.resourcesList(req.query, transaction);
    if (result) {
      return {
        code: 200,
        result,
        message: "Resources list for DDL got successfully.",
      };
    }
    throw new baseError("Some error occurred while fetching list of roles.");
  }

  /**
   * @desc Store a new resource
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @author Ujjwal Bera
   */
  async create(req, transaction) {
    let { name, parent, resourcPermissions } = req.body;
    const resource = await resourceService.create(
      { name, parent },
      transaction
    );
    if (resource) {
      const resourcPermissionsDataSet = [];
      await resourcPermissions.forEach((resourcPermission) => {
        resourcPermissionsDataSet.push({
          resourceId: resource.id,
          permissionId: resourcPermission,
        });
      });
      resourcPermissions = await resourceService.bulkCreate(
        resourcPermissionsDataSet,
        transaction
      );
    }
    if (result) {
      return {
        code: 200,
        result,
        message: "New resource created successfully.",
      };
    }
    throw new baseError("Some error occurred while creating new resource.");
  }

  /**
   * @desc Fetch detail of a resource
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @author Ujjwal Bera
   */
  async findByPk(req, transaction) {
    let resourceId = req.params.id;
    let result = await resourceService.findByPk(resourceId, transaction);
    if (result) {
      return res
        .status(200)
        .json(this.success(result, "Resource details got successfully!"));
    }
    throw new baseError("Some error occurred while fetching resource details.");
  }

  /**
   * @desc Updated a resource
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @author Ujjwal Bera
   */
  async updateByPk(req, transaction) {
    let resourceId = req.params.id;
    let { name, status } = req.body;
    let result = await resourceService.updateByPk(
      resourceId,
      { name, status },
      transaction
    );
    if (result) {
      return res
        .status(200)
        .json(this.success(result, "Resource details updated successfully!"));
    }
    throw new baseError("Some error occurred while updating resource details.");
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
    let result = await resourceService.resourceStatusUpdate(
      resourceId,
      status,
      transaction
    );
    if (result) {
      return res
        .status(200)
        .json(this.success(result, "Resource details updated successfully!"));
    }
    throw new baseError("Some error occurred while updating resource details.");
  }

  /**
   * @desc Delete a resource
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @author Ujjwal Bera
   */
  async deleteByPk(req, transaction) {
    let resourceId = req.params.id;
    let result = await resourceService.deleteByPk(resourceId, transaction);
    if (result) {
      return res
        .status(200)
        .json(this.success(result, "Resource deleted successfully!"));
    }
    throw new baseError("Some error occurred while deleting resource.");
  }
}
module.exports = ResourcesController.getInstance(resourceService);
