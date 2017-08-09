/**
 * Created by sushantmimani on 8/7/17.
 */

var app = require('../../express');
var answerModel_project = require('../models/answer/answer.model.project.server');
var questionModel_project = require('../models/question/question.model.project.server');

app.post ('/api/project/answer', submitAnswer);


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

