const userModel = require("../../../db/models/users");
const historyItemsModel = require("../../../db/models/historyItems");
const userBase = 'name lastName email gender job department';
const historyBase = 'headline subhead article _id user_id'

class searchesAnalytics {
    constructor(){
        this.userModel = userModel;
        this.historyModel = historyItemsModel;
    }
    
    async getUsers(){
        const users =  await this.userModel.find({}, userBase);
        return users
    }

    async getSearches(){
        const searches =  await this.historyModel.find({}, historyBase);
        return searches
    }
}

module.exports = searchesAnalytics;