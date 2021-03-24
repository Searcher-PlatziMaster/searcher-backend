const { config } = require('../../config/index');
const { Client } = require('@elastic/elasticsearch')


const url = `https://${config.es_user}:${config.es_pass}@${config.es_url}`;
const client = new Client({
  node: url
})
module.exports = client;