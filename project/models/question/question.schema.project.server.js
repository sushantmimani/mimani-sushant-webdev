var mongoose = require('mongoose');

var questionSchema_project = mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: "UserModel_project", required:true},
    answer: [{type: mongoose.Schema.Types.ObjectId, ref: "AnswerModel_project"}],
    title: String,
    createdDate: {type: Date, default: Date.now},
    updatedDate: {type: Date, default: Date.now},
    category: {type: mongoose.Schema.ObjectId, ref: "CategoryModel_project"},
    isAnon: {type:Boolean,default:false},
    description: String
}, {collection: "question"});

module.exports = questionSchema_project;