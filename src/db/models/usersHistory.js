const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userHistorySchema = new Schema({
    user_id: Schema.Types.ObjectId,
	search: String,
	articles_id: [ String ]
},{
    versionKey: false,
    timestamps: true
})

const userHistoryModel = mongoose.model('UsersHistory', userHistorySchema);

module.exports = userHistoryModel;
