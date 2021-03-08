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
const insertDocument = (index, id, headline, chapter, article) => {
    try {
        return client.index({
            index: index,
            id: id,
            body: {
                headline,
                chapter,
                article
            }
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
        const res = await client.search({
            index: index,
            // type: '_doc', // uncomment this line if you are using Elasticsearch ≤ 6
            body: {
                query: {
                    simple_query_string: {
                        query: lookingfor
                    }
                }
            }
        })

        return res;
    } catch (error) {
        throw boom.badRequest(error)
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