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
questionModel_project.findQuestionById = findQuestionById;
questionModel_project.addAnswerForQuestion = addAnswerForQuestion;

module.exports = questionModel_project;


function addAnswerForQuestion(answer) {
    return questionModel_project
        .findById(answer.question)
        .then(function (question) {
            question.answer.push(answer._id);
            return updateQuestion(question._id, question);
        })

}

function findQuestionById(questionId) {
    return questionModel_project
        .findById(questionId);
}

function createQuestion (question) {
    return questionModel_project.create(question);

}

function  getQuestionByUser(userId) {
    return questionModel_project.find({user:userId});
}

function getAllQuestions() {
    return questionModel_project
        .find()
        .populate('answer')
        .exec()
}

function updateQuestion(questionId, question) {
    delete question.createdDate;
    question.updatedDate = Date.now;
    return questionModel_project.update({_id:questionId}, {$set:question});
}

function deleteQuestion(questionId) {
    return questionModel_project.remove({_id:questionId});
}

