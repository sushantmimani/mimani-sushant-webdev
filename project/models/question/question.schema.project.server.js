var mongoose = require('mongoose');

var questionSchema = mongoose.Schema({
    username: {type: String, unique: true},
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    credits: Number,
    gender: String,
    createdDate: {type: Date, default: Date.now},
    expertUser: Boolean,
    google:   {
        id:    String,
        token: String
    },
    facebook:   {
        id:    String,
        token: String
    }
}, {collection: "question"});

module.exports = questionSchema;