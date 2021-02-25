const client = require('../../../utils/connections/elasticSearch');

/* Get the health status */
const chechHealth = () => {
    return client.cluster.health();
}

module.exports = {
    chechHealth
}