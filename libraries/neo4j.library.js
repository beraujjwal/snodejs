'use strict';
const neo4j = require('neo4j-driver');
const  { database } = require('../config/neo4j.config');
const { baseError } = require('../system/core/error/baseError');

const { neo4jDriver } = require('../helpers/neo4j');

module.exports = {
    read: async (cypher, params = {}) => {
        const session = neo4jDriver.session({
            database,
            defaultAccessMode: neo4j.session.READ
        });

        const txc = session.beginTransaction();

        return await txc.run(cypher, params).then( async(result) => {
            await txc.commit();
            return result;
        }).catch(async(ex) => {
            await txc.rollback();
            error(ex.message);
            throw new baseError(ex);
        }).finally( async() => {
            await session.close()
        });
    },
    write: async (cypher, params = {}) => {
        const session = neo4jDriver.session({
            database,
            defaultAccessMode: neo4j.session.WRITE
        });
        const txc = session.beginTransaction();

        return await txc.run(cypher, params).then(async(result) => {
            await txc.commit();
            return result.records;
        }).catch(async(ex) => {
            await txc.rollback();
            error(ex.message);
            throw new baseError(ex);
        }).finally( async() => {
            await session.close()
        });
    },
}