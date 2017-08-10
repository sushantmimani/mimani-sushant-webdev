var mongoose = require('mongoose');
var userSchema_project = require('./user.schema.project.server');
var userModel_project = mongoose.model('UserModel_project', userSchema_project);
var bcrypt = require("bcrypt-nodejs");

// methods required as per the assignment
userModel_project.createUser = createUser;
userModel_project.findUserById = findUserById;
userModel_project.findUserByUsername = findUserByUsername;
userModel_project.findUserByCredentials = findUserByCredentials;
userModel_project.updateUser = updateUser;
userModel_project.deleteUser = deleteUser;
userModel_project.findUserByGoogleId = findUserByGoogleId;
userModel_project.findUserByFacebookId = findUserByFacebookId;



//additional methods
userModel_project.findAllUsers = findAllUsers;
userModel_project.addWebsite = addWebsite;
userModel_project.deleteWebsite = deleteWebsite;

module.exports = userModel_project;

function findUserByFacebookId(facebookId) {
    return userModel_project.findOne({'facebook.id': facebookId});

}

function findUserByGoogleId(googleId) {
    return userModel_project.findOne({'google.id': googleId});

}

function deleteWebsite(userId, websiteId) {
    return userModel_project
        .findById(userId)
        .then(function (user) {
            var index = user.websites.indexOf(websiteId);
            user.websites.splice(index, 1);
            return user.save();
        });
}

function addWebsite(userId, websiteId) {
    return userModel_project
        .findById(userId)
        .then(function (user) {
            user.websites.push(websiteId);
            return user.save();
        });
}

function createUser(user) {
    return userModel_project.create(user);
}

function findUserById(userId) {
    return userModel_project.findById(userId);
}

function findAllUsers() {
    return userModel_project.find();
}

function findUserByUsername(user) {
    return userModel_project.find({$or: [{username: user.username}, {email:user.email}]});
}

function findUserByCredentials(username, password) {
     return userModel_project
        .findOne({username: username})
        .then(function (user) {
            if(user && bcrypt.compareSync(password, user.password)) {
                return user;
            } else {
                return null;
            }
        });
}

function updateUser(userId, newUser) {
    delete newUser.username;
    delete newUser.password;
    return userModel_project.update({_id: userId}, {$set: newUser});
}

function deleteUser(userId) {
    return userModel_project.remove({_id: userId});
}