"use strict";
require("dotenv").config();
const { elasticClient } = require("../helpers/elasticsearch");
const { baseError } = require("../system/core/error/baseError");

const searchProperty = {
  type: "text",
  analyzer: "autocomplete",
  search_analyzer: "standard",
};

exports.indexExists = async (indexName) => {
  try {
    if (await elasticClient.indices.exists({ index: indexName })) {
      console.log("Index", indexName, "does already exist");
      throw new baseError("Index", indexName, "does already exist");
    }
    return true;
  } catch (ex) {
    error(ex.message);
    throw new baseError(ex);
  }
};

exports.createIndex = async (indexName) => {
  try {
    if (await this.indexExists(indexName)) {
      throw new baseError("Index", indexName, "does already exist");
    }
    const mappingPath = __dirname + "/../elasticsearch/settings/";
    const file = `${indexName}.settings`;
    const putMapping = require(path.join(mappingPath, file));
    await elasticClient.indices.putMapping(putMapping);
    return await elasticClient.indices.create({
      index: indexName,
      mappings: {},
      settings: {},
    });
  } catch (ex) {
    error(ex.message);
    throw new baseError(ex);
  }
};

exports.indexSetting = async (indexName) => {
  try {
    if (!(await this.indexExists(indexName))) {
      throw new baseError("Index", indexName, "does not exist");
    }
    return await elasticClient.indices.putSettings({
      index: indexName,
      body: {
        settings: {
          max_ngram_diff: 19,
          analysis: {
            filter: {
              autocomplete_filter: {
                type: "ngram",
                min_gram: "1",
                max_gram: "20",
              },
            },
            analyzer: {
              autocomplete: {
                filter: ["lowercase", "autocomplete_filter"],
                type: "custom",
                tokenizer: "standard",
              },
            },
          },
          number_of_replicas: "1",
        },
      },
    });
  } catch (ex) {
    error(ex.message);
    throw new baseError(ex);
  }
};

exports.indexMapping = async (indexName) => {
  try {
    if (!(await this.indexExists(indexName))) {
      throw new baseError("Index", indexName, "does not exist");
    }
    return await elasticClient.indices.putMapping({
      index: indexName,
      body: {
        properties: {
          id: { type: "keyword" },
          createdAt: { type: "date" },
          updatedAt: { type: "date" },
          caseCode: searchProperty,
          policyNo: searchProperty,
          claimRegNo: searchProperty,
          vehicleRegNo: searchProperty,
          vehicleChassisNo: searchProperty,
          claimStatus: { type: "keyword" },
          lossType: { type: "keyword" },
          vehicleType: { type: "keyword" },
          zone: { type: "keyword" },
          insurer: { type: "keyword" },
          caseStatus: { type: "keyword" },
          business: { type: "keyword" },
        },
      },
    });
  } catch (ex) {
    error(ex.message);
    throw new baseError(ex);
  }
};

exports.saveData = async (indexName, type = "_doc", payload) => {
  try {
    if (!(await this.indexExists(indexName))) {
      throw new baseError("Index", indexName, "does not exist");
    }
    return await elasticClient.index({
      index: indexName,
      type: type,
      id: payload.id,
      body: payload,
    });
  } catch (ex) {
    error(ex.message);
    throw new baseError(ex);
  }
};

exports.saveBulkData = async (indexName, type = "_doc", payloads) => {
  const payload = payloads.map((item) => {
    return [
      {
        index: {
          _index: indexName,
          _type: type,
          _id: item.id,
        },
      },
      item,
    ];
  });
  return this.client.bulk({
    refresh: true,
    body: payload,
  });
};

exports.updateData = async (indexName, type = "_doc", payload) => {
  return this.client.update({
    index: indexName,
    type: type,
    id: payload.id,
    body: payload,
  });
};

exports.deleteData = async (indexName, queryId) => {
  try {
    if (!(await this.indexExists(indexName))) {
      throw new baseError("Index", indexName, "does not exist");
    }
    return await elasticClient.delete({
      index: indexName,
      id: queryId,
    });
  } catch (ex) {
    error(ex.message);
    throw new baseError(ex);
  }
};

exports.deleteDataByQuery = async (indexName, type = "_doc", query) => {
  try {
    if (!(await this.indexExists(indexName))) {
      throw new baseError("Index", indexName, "does not exist");
    }
    return await elasticClient.deleteByQuery({
      index: indexName,
      type: type,
      body: {
        query: query,
      },
    });
  } catch (ex) {
    error(ex.message);
    throw new baseError(ex);
  }
};

exports.searchData = async (
  indexName,
  queries,
  page = 1,
  limit = 20,
  orderby = "createdAt",
  ordering = "desc"
) => {
  try {
    if (!(await this.indexExists(indexName))) {
      throw new baseError("Index", indexName, "does not exist");
    }
    const from = parseInt(page) * parseInt(limit) - parseInt(limit);

    return await elasticClient.search({
      index: indexName,
      query: queries,
      sort: {
        [orderby]: { order: ordering },
      },
      from: from,
      size: limit,
    });
  } catch (ex) {
    error(ex.message);
    throw new baseError(ex);
  }
};

exports.multiSearchData = async (indexNames, queries) => {
  try {
    const searches = [];
    indexNames.map(async (indexName) => {
      if (await this.indexExists(indexName)) {
        searches.push({ index: indexName });
        queries.map(async (query) => {
          searches.push({ query: { match: query } });
        });
      }
    });
    return await elasticClient.msearch({
      searches: searches,
    });
  } catch (ex) {
    error(ex.message);
    throw new baseError(ex);
  }
};
