const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    lastName: String,
    gender: String,
    job: String,
    password: String,
    birthDate:  Date,
    department: String,
    email: {
        type: String,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    isAdmin: {
        type:Boolean,
        default: false
    },
},{
    versionKey: false,
    timestamps: true
})

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;