/**
 * Created by sushantmimani on 6/26/17.
 */

var app = require('../../express');
var userModel = require('../models/user/user.model.server');

app.get ('/api/user', findUserByCredentials);
app.get ('/api/user/:userId',findUserById );
app.get ('/api/username',findUserByUsername);
app.post ('/api/user', createUser);
app.put  ('/api/user/:userId', updateUser);
app.delete ('/api/user/:userId', deleteUser);



var users = [
    {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder", email: "test1@gmail.com"},
    {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley", email: "test2@gmail.com"},
    {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia", email: "test3@gmail.com"},
    {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi", email: "test4@gmail.com"}
];



function deleteUser(req, res) {
    var userId = req.params.userId;
    userModel
        .deleteUser(userId)
        .then(function (status) {
            res.send(status);
        })
}

function updateUser(req, res) {
    var user = req.body;
    userModel
        .updateUser(req.params.userId, user)
        .then(function (status) {
            res.send(status);
        });
}

function createUser(req, res) {
    var user = req.body;
    userModel
        .createUser(user)
        .then(function (user) {
            res.json(user);
        }, function (err) {
            res.send(err);
        });
}

function findUserById(req, res) {
    var userId = req.params.userId;
    userModel
        .findUserById(userId)
        .then(function (user){
            res.json(user);
        });
}

function findUserByCredentials(req,res) {
    var username = req.query.username;
    var password = req.query.password;
    userModel
        .findUserByCredentials(username, password)
        .then(function (user) {
            if(user){
                res.json(user)
            }
            else {
                res.sendStatus(404)
            }
        });
}

function findUserByUsername(req,res){
    var username = req.query.username;
    userModel.findUserByUsername(username)
        .then(function (user) {
            if(user){
                res.json(user);
            }
            else {
                res.send("available");
            }
        });

}
