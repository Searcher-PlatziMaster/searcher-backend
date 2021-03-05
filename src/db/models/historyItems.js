const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const HistoryItemSchema = new Schema({
    user_id: Schema.Types.ObjectId,
    source: String,
	headline: {
        Title: String,
        Name: String
    },
    chapter: {
        title: String,
        name: String
    },
    article: {
        name: String,
        content: [String]
    }
},{
    timestamps: true
})

const historyItemsModel = mongoose.model('HistoryItems', HistoryItemSchema);

module.exports = historyItemsModel;
