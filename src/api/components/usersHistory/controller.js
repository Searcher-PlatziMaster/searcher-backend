const clientES = require('../../../utils/connections/elasticSearch')
const UsersHistoryStore = require('./store');

class UsersHistoryController {
    constructor() {
        this.usersHistoryStore = new UsersHistoryStore()
        this.clientES = clientES
    }
    async getUserHistory(userId) {
        return await this.usersHistoryStore.getUserHistory(userId)
    }
    async createUserHistory(userId, historyItem) {
        const { articles_id } = historyItem
        
        let historyItemsSource = []  
        
        let { body } = await this.clientES.search({
            index: 'constitucion_politica_de_colombia',
            body: {
                query: {
                    terms: {
                        _id: articles_id
                    }
                }
            }
        })
        
        body.hits.hits.map(article => historyItemsSource.push({user_id: userId, ...article._source}))

        return await this.usersHistoryStore.createUserHistory({ user_id: userId, ...historyItem }, historyItemsSource);
    }
    async deleteUserHistory(historyItemId) {
        try {
            return await this.usersHistoryStore.deleteUserHistory({_id: historyItemId})
             
        } catch (error) {
            throw new Error('Internal Error')
        }
    }
}

module.exports = UsersHistoryController
