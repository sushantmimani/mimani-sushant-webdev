var mongoose = require('mongoose');

var answerSchema_project = mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: "UserModel_project", required:true},
    answerText: String,
    createdDate: {type: Date, default: Date.now},
    updatedDate: {type: Date, default: Date.now},
    isAnon: Boolean,
    question: {type: mongoose.Schema.Types.ObjectId, ref: "QuestionModel_project", required:true},
    upVotes: {type:Number,default:0},
    downVotes: {type:Number,default:0},
}, {collection: "answer"});

module.exports = answerSchema_project;