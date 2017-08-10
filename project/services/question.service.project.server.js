/**
 * Created by sushantmimani on 8/7/17.
 */

var app = require('../../express');
var questionModel_project = require('../models/question/question.model.project.server');

app.post ('/api/project/question', createQuestion);
app.get ('/api/project/question', getQuestions);
app.get ('/api/project/questionDetails/:qId', getQuestionById);

function getQuestionById(req, res) {
    var qId = req.params.qId
    questionModel_project
        .getQuestionById(qId)
        .then(function (question) {
            res.send(question);
        })
}

function createQuestion(req,res) {
    var question = req.body;
    questionModel_project
        .createQuestion(question)
        .then(function (question) {
            res.json(question);
        }, function (err) {
            res.send(err);
        });
}

    function getQuestions(req, res) {
        questionModel_project
            .getAllQuestions()
            .then(function (questions) {
                res.send(questions);
            })
    }
