/**
 * Created by sushantmimani on 6/26/17.
 */

var app = require('../../express');

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
    var user = users.find(function (user) {
        return user._id === userId;
    });
    var index = users.indexOf(user);
    users.splice(index, 1);
    res.sendStatus(200);
}

function updateUser(req, res) {
    var userId = req.params.userId;
    var user = req.body;
    for(var u in users) {
        if(userId === users[u]._id) {
            users[u] = user;
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}

function createUser(req, res) {
    var user = req.body;
    user._id = (new Date()).getTime() + "";
    users.push(user);
    res.send(user);
}

function findUserById(req, res) {
    var userId = req.params.userId;
    for(var u in users) {
        if (users[u]._id === userId) {
            res.status(200).send(users[u]);
            return;
        }
    }
    res.sendStatus(404);
}

function findUserByCredentials(req,res) {
    var username = req.query.username;
    var password = req.query.password;
    var found = null
    for (var u in users) {
        var user = users[u];
        if (user.username === username && user.password === password) {
            found = user;
            res.status(200).send(found);
            return;
        }
    }
        res.sendStatus(404);
}

function findUserByUsername(req,res, next){
        var found = null
        var username = req.query.username;
        for (var u in users) {
            var user = users[u];
            if (user.username === username) {
                found = user;
                res.status(200).send(found);
                return;
            }
        }
        res.sendStatus(404);
}
