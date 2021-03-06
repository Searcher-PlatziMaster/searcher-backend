const userHistoryModel = require("../../../db/models/usersHistory")
const historyItemsModel = require("../../../db/models/historyItems")

class UsersHistoryStore {
    constructor(){
        this.userHistoryModel = userHistoryModel
        this.historyItemsModel = historyItemsModel
    }
    
    async getUserHistory(userId){
        return await this.historyItemsModel.find({user_id: userId})
    }

    async createUserHistory(historyItem, historyItemsArray){
        await this.historyItemsModel.insertMany(historyItemsArray)
        return await this.userHistoryModel.create(historyItem)
    }
    
    async deleteUserHistory(query){
        try {
            await this.historyItemsModel.deleteOne(query) 
            return 'Item Deleted'   
        } catch (error) {
           throw new Error('Internal Error')
        }
    }
}

module.exports = UsersHistoryStore