var mongoose = require('mongoose');

var categorySchema_project = mongoose.Schema({
    type: String

}, {collection: "category"});

module.exports = categorySchema_project;