const { config } = require('../../config/index');
const { Client } = require('@elastic/elasticsearch')


const url = `https://${config.es_user}:${config.es_pass}@search-searchercoldummy-g6tifm7x4ckvfhs2433rfpb7bu.us-west-1.es.amazonaws.com/`;

const client = new Client({
  node: url
})
module.exports = client;