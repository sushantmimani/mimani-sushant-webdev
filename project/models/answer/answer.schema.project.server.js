var mongoose = require('mongoose');

var answerSchema_project = mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: "UserModel_project", required:true},
    answerText: String,
    createdDate: {type: Date, default: Date.now},
    updatedDate: {type: Date, default: Date.now},
    // category: {type: mongoose.Schema.Types.ObjectId, ref: "categoryModel"},
    isAnon: Boolean,
    question: {type: mongoose.Schema.Types.ObjectId, ref: "QuestionModel_project", required:true},
}, {collection: "answer"});

module.exports = answerSchema_project;