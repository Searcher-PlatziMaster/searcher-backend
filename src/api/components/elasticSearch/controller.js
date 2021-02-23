const client = require('../../../utils/connections/elasticSearch');


const chechHealth = () => {
    // client.cluster.health();
    return client.ping({});
}

module.exports = {
    chechHealth
}