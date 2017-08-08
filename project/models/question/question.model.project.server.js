/**
 * Created by sushantmimani on 8/7/17.
 */

var mongoose = require('mongoose');
var questionSchema_project = require('./question.schema.project.server');
var questionModel_project = mongoose.model('QuestionModel_project', questionSchema_project);

questionModel_project.createQuestion = createQuestion;
questionModel_project.getQuestionByUser = getQuestionByUser;
questionModel_project.getAllQuestions = getAllQuestions;
questionModel_project.updateQuestion = updateQuestion;
questionModel_project.deleteQuestion = deleteQuestion;

module.exports = questionModel_project;


function createQuestion (question) {
    return questionModel_project.create(question);

}

function  getQuestionByUser(userId) {
    return questionModel_project.find({user:userId});
}

function getAllQuestions() {
    return questionModel_project.find();
}

function updateQuestion(questionid, question) {
    delete question.createdDate;
    return questionModel_project.update({_id:questionid}, {$set:question});
}

function deleteQuestion(questionId) {
    return questionModel_project.remove({_id:questionId});
}

