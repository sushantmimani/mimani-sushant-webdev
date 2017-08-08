var mongoose = require('mongoose');

var userSchema_project = mongoose.Schema({
    username: {type: String, unique: true, required:true},
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
}, {collection: "user"});

module.exports = userSchema_project;