const { Sequelize, sequelize, Op } = require("sequelize");
const { base } = require("../base");
const { baseError } = require("../error/baseError");

class baseService extends base {
  /**
   * Base Service Layer
   * @author Ujjwal Bera
   * @param null
   */
  constructor(model) {
    super();
    this.model = this.getModel(model);
    this.name = model;
  }

  /**
   * @description Fetch list of items with total count
   * @author Ujjwal Bera<ujjwalbera.dev@gmail.com>
   * @param {*} param0
   * @param {*} param1
   * @returns { rows, count } response
   */
  async findAll(
    {
      orderby = "name",
      ordering = "ASC",
      limit = this.getEnv("DATA_PER_PAGE") || 15,
      page = 1,
      ...search
    },
    { filter = null, include = [], attributes, transaction }
  ) {
    try {
      if (!attributes) attributes = await this.getModelAttributes(this.model);

      const order = ordering.toUpperCase();
      limit = parseInt(limit);
      page = parseInt(page);
      if (page < 1) page = 1;
      const skip = page * limit - limit;

      if (filter === null) {
        filter = await this.generateQueryFilterFromQueryParams(search);
      }

      // if (attributes.includes("createdBy")) {
      //   const User = this.getModel("User");
      //   include.push({
      //     model: User,
      //     as: "createdByUser",
      //     attributes: ["id", "name", "phone", "email", "status"],
      //     required: false,
      //   });
      //   delete attributes.createdBy;
      // }
      // if (attributes.includes("updatedBy")) {
      //   const User = this.getModel("User");
      //   include.push({
      //     model: User,
      //     as: "updatedByUser",
      //     attributes: ["id", "name", "phone", "email", "status"],
      //     required: false,
      //   });
      //   delete attributes.updatedBy;
      // }

      if (include.length < 1) include = await this.getAutoIncludes(this.model);

      console.log("include", include);

      const result = await this.model.findAll({
        attributes: attributes,
        where: filter,
        include: include,
        order: [[orderby, order]],
        limit: limit,
        offset: skip,
        transaction,
      });

      const count = await this.model.count({
        where: filter,
        include: include,
        transaction,
      });

      return {
        rows: result,
        count,
      };
    } catch (ex) {
      console.log("ex", ex);
      throw new baseError(
        ex.message || `Some error occurred while fetching ${this.name}s list.`,
        400
      );
    }
  }

  /**
   * @description Fetch item by query
   * @author Ujjwal Bera<ujjwalbera.dev@gmail.com>
   * @param {*} param0
   * @param {*} param1
   * @returns { rows, count } response
   */
  async findOne(search, { filter = null, include, attributes, transaction }) {
    try {
      if (!attributes) attributes = await this.getModelAttributes(this.model);
      if (filter === null)
        filter = await this.generateQueryFilterFromQueryParams(search);
      const item = await this.model.findOne({
        attributes: attributes,
        where: filter,
        include: include,
        transaction: transaction,
      });
      if (!item)
        throw new baseError(
          `Some error occurred while fetching ${this.name} details.`,
          410
        );

      return item;
    } catch (ex) {
      throw new baseError(
        ex.message ||
          `Some error occurred while fetching ${this.name} details.`,
        400
      );
    }
  }

  async findByPk(id, { transaction, include, attributes }) {
    try {
      if (!attributes) attributes = await this.getModelAttributes(this.model);
      let item = await this.model.findByPk(id, {
        include: include,
        attributes: attributes,
        transaction: transaction,
      });
      if (!item)
        throw new baseError(
          `Some error occurred while fetching ${this.name} details.`,
          400
        );
      return item;
    } catch (ex) {
      throw new baseError(ex);
    }
  }

  async create(data, { transaction }) {
    try {
      const modelAttributes = await this.getModelAttributes(this.model);
      const modelAssociations = await this.getModelAssociations(this.model);
      console.log("modelAssociations", modelAssociations);
      let finalData = [];

      for (const [key, value] of Object.entries(data)) {
        console.log(`Key: ${key}, Value: ${value}`);
        if (modelAttributes.includes(key)) {
          finalData[key] = value;
        } else {
        }
      }

      // Object.keys(data).forEach(
      //   (key) => data[key] === undefined && delete data[key]
      // );
      const item = await this.model.create(finalData, { transaction });
      if (!item)
        throw new baseError(
          `Some error occurred while adding this new ${this.name}.`
        );
      return item;
    } catch (ex) {
      throw new baseError(
        ex.message || `Some error occurred while adding new ${this.name}.`,
        400
      );
    }
  }

  async bulkCreate(data, { transaction }) {
    try {
      const items = await this.model.bulkCreate(data, { transaction });

      if (!items)
        throw new baseError(
          `Some error occurred while adding new ${this.name}s.`
        );
      return items;
    } catch (ex) {
      throw new baseError(
        ex.message || `Some error occurred while adding new ${this.name}s.`,
        400
      );
    }
  }

  async update(search, data, transaction) {
    try {
      const filter = await this.generateQueryFilterFromQueryParams(search);
      const dbItem = await this.get(filter, transaction);
      if (!dbItem) {
        throw new baseError(
          `Some error occurred while fetching the ${this.name} details.`,
          500
        );
      }
      Object.keys(data).forEach(
        (key) => data[key] === undefined && delete data[key]
      );

      const item = await this.model.update(data, {
        where: filter,
        transaction: transaction,
      });
      if (!item)
        throw new baseError(
          `Some error occurred while updating the ${this.name}.`,
          500
        );

      const oldDBItem = dbItem.toJSON();
      const newTeamDetails = { ...oldDBItem, ...data };
      return newTeamDetails;
    } catch (ex) {
      throw new baseError(
        ex.message || `Some error occurred while updating the ${this.name}.`,
        ex.statusCode || 400
      );
    }
  }

  async updateByPk(id, data, transaction) {
    try {
      const search = { id: id, deleted: false };
      return await this.update(search, data, transaction);
    } catch (ex) {
      throw new baseError(
        ex.message || `Some error occurred while updating the ${this.name}.`,
        400
      );
    }
  }

  async bulkUpdate(search, data, transaction) {
    try {
      const filter = await this.generateQueryFilterFromQueryParams(search);
      Object.keys(data).forEach(
        (key) => data[key] === undefined && delete data[key]
      );

      const item = await this.model
        .updateMany(filter, data)
        .transaction(transaction);
      if (!item)
        throw new baseError(
          `Some error occurred while updating the ${this.name}s.`,
          500
        );

      return item;
    } catch (ex) {
      throw new baseError(
        ex.message || `Some error occurred while updating the ${this.name}.`,
        ex.statusCode || 400
      );
    }
  }

  async destroy(search, transaction) {
    try {
      const filter = await this.generateQueryFilterFromQueryParams(search);
      const item = await this.model.destroy({
        where: { filter },
        transaction: transaction,
      });
      if (!item)
        throw new baseError(
          `Some error occurred while deleting the ${this.name}.`,
          500
        );
      return item;
    } catch (ex) {
      throw new baseError(
        ex.message || `Some error occurred while deleting the ${this.name}.`,
        ex.statusCode || 400
      );
    }
  }

  async destroyByPk(id, transaction) {
    try {
      let filter = { _id: id, deleted: false };
      const item = await this.model.destroy({
        where: { filter },
        transaction: transaction,
      });
      if (!item)
        throw new baseError(
          `Some error occurred while deleting the ${this.name}.`,
          500
        );
      return item;
    } catch (ex) {
      throw new baseError(
        ex.message || `Some error occurred while deleting the ${this.name}.`,
        ex.statusCode || 400
      );
    }
  }

  async generateQueryFilterFromQueryParams(search) {
    try {
      let filter = [];
      for (const field in search) {
        if (field === "ids") {
          filter.push({
            id: search[field].split(","),
          });
        } else if (field === "keyword") {
          filter.push({
            name: {
              [Op.like]: `%${search[field]}%`,
            },
          });
        } else if (Number(search[field])) {
          filter.push({
            [field]: Number(search[field]),
          });
        } else if (
          search[field].toLowerCase() === "true" ||
          search[field].toLowerCase() === "false"
        ) {
          if (search[field].toLowerCase() === "true") {
            filter.push({
              [field]: true,
            });
          } else {
            filter.push({
              [field]: false,
            });
          }
        } else {
          filter.push({
            [field]: {
              [Op.like]: `%${search[field]}%`,
            },
          });
        }
      }
      return filter;
    } catch (ex) {
      throw new baseError(
        ex.message || `Some error occurred while generating query.`,
        ex.statusCode || 400
      );
    }
  }

  async getModelAssociations(model, name) {
    const result = [];

    // console.log("name", name);

    // let entries = Object.entries(
    //   model?.associations?.roleResourcePermissions?.sequelize?.models[name]
    //     ?._scope.attributes
    // );
    // let data = entries.map(([key, val] = entry) => {
    //   return `The ${key} is ${val}`;
    // });
    // console.log(data);

    Object.keys(model.associations).forEach(async (key) => {
      if (model.associations[key].hasOwnProperty("options")) {
        const data = {
          accessors: model.associations[key]?.accessors,
          isSelfAssociation: model.associations[key]?.isSelfAssociation,
          type: model.associations[key]?.associationType,
          model: model.associations[key]?.target,
          where: model.associations[key]?.scope,
          as: model.associations[key]?.as,
          auto: model.associations[key]?.options?.auto === false ? false : true,
          required:
            model.associations[key]?.options?.required === false ? false : true,
        };
        if (model.associations[key]?.options?.attributes)
          data.attributes = model.associations[key]?.options?.attributes;

        if (model.associations[key]?.options?.through) {
          data.through = {
            where: model.associations[key]?.options?.through?.scope,
            attributes:
              model.associations[key]?.options?.through?.attributes || [],
          };
        }
        result.push(data);
      }
    });

    return result;
  }

  async buildAssociations(modelAssociations) {
    const includes = [];

    await modelAssociations.forEach(async (modelAssociation) => {
      if (modelAssociation.type === "BelongsTo") {
        if (modelAssociation?.auto) {
          includes.push({
            model: modelAssociation?.model,
            as: modelAssociation?.as,
            where: modelAssociation?.where || {},
            required: modelAssociation?.required,
          });
        }
      } else if (modelAssociation.type === "BelongsToMany") {
        if (modelAssociation?.auto) {
          includes.push({
            model: modelAssociation?.model,
            as: modelAssociation?.as,
            where: modelAssociation?.where || {},
            required: modelAssociation?.required,
            through: modelAssociation?.through,
          });
        }
      }
    });

    return includes;
  }

  async getAutoIncludes(model, name) {
    const associations = await this.getModelAssociations(model, name);
    //console.log("associations", associations);
    return await this.buildAssociations(associations);
  }

  async getModelAttributes(model, name) {
    const result = [];

    const rawAttributes = model.rawAttributes;

    for (let key of Object.keys(rawAttributes)) {
      result.push(key);
    }

    return result;
  }
}

module.exports = { baseService };
