/**
 * Created by sushantmimani on 6/26/17.
 */

var app = require('../../express');
var userModel_project = require('../models/user/user.model.project.server');
var passport_project = require('passport');
app.use(passport_project.initialize());
app.use(passport_project.session());
var LocalStrategy = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var bcrypt = require("bcrypt-nodejs");

passport_project.use('localproject',new LocalStrategy(localStrategy));
passport_project.serializeUser(serializeUser);
passport_project.deserializeUser(deserializeUser);

app.get ('/api/project/username',findUserByUsername);
app.get ('/api/project/checkLoggedIn', checkLoggedIn);

app.put  ('/api/project/user/:userId', updateUser);
app.delete ('/api/project/user/:userId', deleteUser);

app.post ('/api/project/user', createUser);
app.post  ('/api/project/logout', logout);
app.post  ('/api/project/register', register);
app.post ('/api/project/login', passport_project.authenticate('localproject'), login);



function checkLoggedIn (req, res) {
    if(req.isAuthenticated()) {
        res.json(req.user);
    } else {
        res.send('0');
    }
};

function register(req, res) {
    var user = req.body;
    user.password = bcrypt.hashSync(user.password);
    userModel_project
        .createUser(user)
        .then(function (user) {
            req.login(user, function (status) {
                res.send(status)
            });
        }, function (err) {
            res.send(err);
        });
}

app.get ('/project/auth/google', passport_project.authenticate('googleproject', { scope : ['profile', 'email'] }));

app.get ('/project/auth/google/callback',
    passport_project.authenticate('googleproject', {
        successRedirect: '/project/index.html#!/read',
        failureRedirect: '/project/index.html#!/login'
    }));


var googleConfig = {
    clientID: process.env.GOOGLE_CLIENTID,
    clientSecret: process.env.GOOGLE_CLIENTSECRET
};

function googleStrategy(token, refreshToken, profile, done) {

    userModel_project
        .findUserByGoogleId(profile.id)
        .then(
            function(user) {
                if(user) {
                    userId = user._id;
                    return done(null, user);
                } else {

                    var newGoogleUser = {
                        firstName: profile.name.givenName,
                        lastName:profile.name.familyName,
                        email: profile.emails[0].value,
                        username: profile.emails[0].value.split('@')[0],
                        google: {
                            id:          profile.id,
                            token:       token
                        }
                    };

                    return userModel_project.createUser(newGoogleUser)

                }
            },
            function(err) {
                if (err) { return done(err); }
            }
        )
        .then(
            function(user){
                return done(null, user);
            },
            function(err){
                if (err) { return done(err); }
            }
        );
}

var facebookConfig = {
    clientID: process.env.FACEBOOK_CLIENTID,
    clientSecret: process.env.FACEBOOK_CLIENTSECRET
};

app.get ('/project/auth/facebook', passport_project.authenticate('facebookproject', { scope : 'email' }));
app.get ('/project/auth/facebook/callback',
    passport_project.authenticate('facebookproject', {
        successRedirect: '/project/index.html#!/read',
        failureRedirect: '/project/index.html#!/login'
    }), function(req, res){
        res.send(200);
    });



function localStrategy(username, password, done) {
    userModel_project
        .findUserByCredentials(username, password)
        .then(
            function(user) {
                if (!user) { return done(null, false); }
                return done(null, user);
            },
            function(err) {
                if (err) { return done(err); }
            }
        );
}





if(process.env.MLAB_USERNAME_WEBDEV) {
    googleConfig.callbackURL = "https://mimani-sushant-webdev.herokuapp.com/project/auth/google/callback"
    facebookConfig.callbackURL = "https://mimani-sushant-webdev.herokuapp.com/project/auth/facebook/callback"

}
else{
    googleConfig.callbackURL = "http://localhost:3000/project/auth/google/callback"
    facebookConfig.callbackURL = "http://localhost:3000/project/auth/facebook/callback"
}


passport_project.use('googleproject',new GoogleStrategy(googleConfig, googleStrategy));
passport_project.use('facebookproject',new FacebookStrategy(facebookConfig, facebookStrategy));


function facebookStrategy(token, refreshToken, profile, done) {
    userModel_project
        .findUserByFacebookId(profile.id)
        .then(
            function(user) {
                if(user) {
                    return done(null, user);
                } else {
                    var names = profile.displayName.split(" ");
                    var newFacebookUser = {
                        firstName:  names[0],
                        lastName: names[1],
                        username: names[0].toLowerCase()+names[1].toLowerCase(),
                        email:     profile.emails ? profile.emails[0].value:"",
                        facebook: {
                            id:    profile.id,
                            token: token
                        }
                    };
                    return userModel_project.createUser(newFacebookUser);
                }
            },
            function(err) {
                if (err) { return done(err); }
            }
        )
        .then(
            function(user){
                return done(null, user);
            },
            function(err){
                if (err) { return done(err); }
            }
        );
}




function deleteUser(req, res) {
    var userId = req.params.userId;
    userModel_project
        .deleteUser(userId)
        .then(function (status) {
            res.send(status);
        })
}

function updateUser(req, res) {
    var user = req.body;
    userModel_project
        .updateUser(req.params.userId, user)
        .then(function (status) {
            res.send(status);
        });
}

function createUser(req, res) {
    var user = req.body;
    user.password = bcrypt.hashSync(user.password);
    userModel_project
        .createUser(user)
        .then(function (user) {
            res.json(user);
        }, function (err) {
            res.send(err);
        });
}

function findUserById(req, res) {
    var userId = req.params.userId;
    userModel_project
        .findUserById(userId)
        .then(function (user){
            res.json(user);
        });
}

function findUserByCredentials(req,res) {
    var username = req.query.username;
    var password = req.query.password;
    userModel_project
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

function findUserByUsername(req,res) {
    var user = JSON.parse(req.query.username);
    userModel_project.findUserByUsername(user)
        .then(function (user) {
            if (user.length!=0) {
                res.json(user);
            }
            else {
                res.send("available");
            }
        });
}

function serializeUser(user, done) {
    done(null, user);
}

function deserializeUser(user, done) {
    userModel_project
        .findUserById(user._id)
        .then(
            function (user) {
                done(null, user);
            },
            function (err) {
                done(err, null);
            }
        );

}

function login(req, res) {
    res.json(req.user);

}

function logout(req, res) {
    req.logOut();
    res.send(200);
}

