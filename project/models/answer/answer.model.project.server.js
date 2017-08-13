/**
 * Created by sushantmimani on 8/7/17.
 */

var mongoose = require('mongoose');
var answerSchema_project = require('./answer.schema.project.server');
var answerModel_project = mongoose.model('AnswerModel_project', answerSchema_project);

answerModel_project.submitAnswer = submitAnswer;
answerModel_project.updateAnswer = updateAnswer;
answerModel_project.getAnswerByUser = getAnswerByUser;
answerModel_project.deleteAnswer = deleteAnswer;
answerModel_project.getCount = getCount;


module.exports = answerModel_project;

function getCount() {
    return answerModel_project.count();
}
function deleteAnswer(answerId) {
    return answerModel_project.remove({_id:answerId})
}

function submitAnswer (answer) {
    return answerModel_project.create(answer);

}

function updateAnswer(answer) {
    return answerModel_project.update({_id:answer._id},{$set:answer})
}

function  getAnswerByUser(userId) {
    return answerModel_project
        .find({user:userId})
        .populate('question')
        .exec()
}