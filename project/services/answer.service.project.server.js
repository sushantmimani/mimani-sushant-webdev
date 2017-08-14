/**
 * Created by sushantmimani on 8/7/17.
 */

var app = require('../../express');
var answerModel_project = require('../models/answer/answer.model.project.server');
var questionModel_project = require('../models/question/question.model.project.server');

app.post ('/api/project/answer', submitAnswer);
app.put ('/api/project/answer', updateAnswer);
app.get ('/api/project/answer/:userId', getAllAnswersForUser);
app.delete ('/api/project/answer/:answerId', deleteAnswer);
app.get ('/api/project/answerCount', getCount);
app.delete ('/api/project/answerbyuser/:userId', deleteAnswerforUser)

function deleteAnswerforUser(req, res) {
    var userId = req.params.userId;
    answerModel_project
        .deleteAnswerForUser(userId)
        .then(function (response) {
            res.send(response);
        })
}

function getCount(req, res) {
    answerModel_project
        .getCount()
        .then(function (response) {
            res.send(JSON.stringify(response));
        })
}

function deleteAnswer(req, res) {
    var answerId = req.params.answerId;
    answerModel_project
        .deleteAnswer(answerId)
        .then(function (response) {
            res.send(response);
        })
}

function getAllAnswersForUser(req, res) {
    var userId = req.params.userId;
    answerModel_project
        .getAnswerByUser(userId)
        .then(function (answers) {
            res.send(answers);
        })
}

function updateAnswer(req, res) {
    var answer = req.body;
    answerModel_project
        .updateAnswer(answer)
        .then(function (response) {
            res.send(response);
        })
}
function submitAnswer(req,res) {
    var answer = req.body;
    answerModel_project
        .submitAnswer(answer)
        .then(function (answer) {
            questionModel_project
                .addAnswerForQuestion(answer)
            res.json(answer);
        }, function (err) {
            res.send(err);
        });
}

