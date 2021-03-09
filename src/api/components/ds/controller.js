const boom = require('@hapi/boom');
const SearchesAnalytics = require('./store');
const searcherAnalytics = new SearchesAnalytics();
//  const conver2Csv = require('../../../utils/convertToCSV');


const getSearches = async () => {
    const data = await searcherAnalytics.getSearches();
    if(data.length < 1) throw boom.notFound('There are not searches');
    //  const converted = await conver2Csv.convertToCsv(data);
    
    const resString = JSON.stringify(data);
    return resString;
}

const getUsers = async () => {
    const users = await searcherAnalytics.getUsers();
    if(users.length < 1) throw boom.notFound('Looks like no one have searched anything');
    
    /**
     * const converted = await conver2Csv.convertToCsv(users);
     * return converted;
     */

    const resString = JSON.stringify(users);
    return resString;
}
module.exports = {
    getSearches,
    getUsers
}