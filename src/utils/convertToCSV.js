/* eslint-disable no-unused-vars */
const { Parser, transforms: { unwind } } = require('json2csv');
const boom = require('@hapi/boom');



const convertToCsv = async (data) => {
    try {
        const fields = ['headline.title', 'headline.name', 'subhead.title', 'subhead.name', 'article.content', 'article.name', '_id', 'user_id'];

        const transforms = [unwind({ paths: ['article.content'] })];
        const parser = new Parser({ fields });
        const converted = parser.parse(data);


        return converted;
    } catch (error) {
        throw boom.badImplementation('Error converting to CSV');
    }
}


module.exports = {
    convertToCsv
}