var mongoose = require('mongoose');

var questionSchema_project = mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: "UserModel_project", required:true},
    answer: [{type: mongoose.Schema.Types.ObjectId, ref: "AnswerModel_project"}],
    title: String,
    createdDate: {type: Date, default: Date.now},
    updatedDate: {type: Date, default: Date.now},
    category: {type: mongoose.Schema.Types.ObjectId, ref: "CategoryModel_Project"},
    isAnon: Boolean,
    description: String
}, {collection: "question"});

module.exports = questionSchema_project;