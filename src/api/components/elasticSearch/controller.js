const client = require('../../../utils/connections/elasticSearch');
const boom = require('@hapi/boom');


const chechHealth = () => {
    // client.cluster.health();
    return client.ping({});
}
const createIndex = (index) => {
    return client.indices.create({
        index: index
    })
}
const insertDocument = (data) => {
    try {
        return client.index({
            data
        });
    } catch (error) {
        throw boom.badRequest(error);
    }
}

const refreshIndex = (index) => {
    try {
        return client.indices.refresh({ index: index });
    } catch (error) {
        throw boom.internal(error);
    }
}

const searchBasic = async (index, lookingfor) => {
    try {
        const { body } = await client.search({
            index: index,
            body: {
                query: {
                    simple_query_string: {
                        query: lookingfor
                    }
                }
            }
        })
        if (body.hits.hits.length === 0) throw boom.notFound(`We are not able to find "${lookingfor}"`);
        return body;
    } catch (error) {
        throw boom.notFound(error);
    }

}

const getMappings = async (index) => {
    return client.indices.getMapping({
        index
    })
}

module.exports = {
    chechHealth,
    createIndex,
    insertDocument,
    refreshIndex,
    searchBasic,
    getMappings
}