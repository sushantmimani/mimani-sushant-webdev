var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');
var userModel = mongoose.model('UserModel', userSchema);
var bcrypt = require("bcrypt-nodejs");

// methods required as per the assignment
userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.findUserByUsername = findUserByUsername;
userModel.findUserByCredentials = findUserByCredentials;
userModel.updateUser = updateUser;
userModel.deleteUser = deleteUser;
userModel.findUserByGoogleId = findUserByGoogleId;
userModel.findUserByFacebookId = findUserByFacebookId;


//additional methods
userModel.findAllUsers = findAllUsers;
userModel.addWebsite = addWebsite;
userModel.deleteWebsite = deleteWebsite;

module.exports = userModel;

function findUserByFacebookId(facebookId) {
    return userModel.findOne({'facebook.id': facebookId});

}

function findUserByGoogleId(googleId) {
    return userModel.findOne({'google.id': googleId});
}

function deleteWebsite(userId, websiteId) {
    return userModel
        .findById(userId)
        .then(function (user) {
            var index = user.websites.indexOf(websiteId);
            user.websites.splice(index, 1);
            return user.save();
        });
}

function addWebsite(userId, websiteId) {
    return userModel
        .findById(userId)
        .then(function (user) {
            user.websites.push(websiteId);
            return user.save();
        });
}

function createUser(user) {
    return userModel.create(user);
}

function findUserById(userId) {
    return userModel.findById(userId);
}

function findAllUsers() {
    return userModel.find();
}

function findUserByUsername(username) {
    return userModel.findOne({username: username});
}

function findUserByCredentials(username, password) {
    return userModel
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
    return userModel.update({_id: userId}, {$set: newUser});
}

function deleteUser(userId) {
    return userModel.remove({_id: userId});
}