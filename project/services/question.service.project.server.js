/**
 * Created by sushantmimani on 8/7/17.
 */

var app = require('../../express');
var questionModel_project = require('../models/question/question.model.project.server');

app.post ('/api/project/question', createQuestion);

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