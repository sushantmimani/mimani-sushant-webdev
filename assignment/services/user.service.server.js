/**
 * Created by sushantmimani on 6/26/17.
 */

var app = require('../../express');
var userModel = require('../models/user/user.model.server');
var passport_assignment = require('passport');
app.use(passport_assignment.initialize());
app.use(passport_assignment.session());
var LocalStrategy = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var bcrypt = require("bcrypt-nodejs");

passport_assignment.use(new LocalStrategy(localStrategy));
passport_assignment.serializeUser(serializeUser);
passport_assignment.deserializeUser(deserializeUser);

app.get ('/api/user', findUserByCredentials);
app.get ('/api/user/:userId',findUserById );
app.get ('/api/username',findUserByUsername);
app.get ('/api/checkLoggedIn', checkLoggedIn);

app.put  ('/api/user/:userId', updateUser);
app.delete ('/api/user/:userId', deleteUser);

app.post ('/api/user', createUser);
app.post  ('/api/logout', logout);
app.post  ('/api/register', register);
app.post ('/api/login', passport_assignment.authenticate('local'), login);



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
    console.log(user);
    userModel
        .createUser(user)
        .then(function (user) {
            req.login(user, function (status) {
                res.send(status)
            });
        }, function (err) {
            res.send(err);
        });
}

app.get ('/auth/google', passport_assignment.authenticate('google', { scope : ['profile', 'email'] }));

app.get ('/auth/google/callback',
    passport_assignment.authenticate('google', {
        successRedirect: '/assignment/index.html#!/profile',
        failureRedirect: '/assignment/index.html#!/login'
    }));


var googleConfig = {
    clientID: process.env.GOOGLE_CLIENTID,
    clientSecret: process.env.GOOGLE_CLIENTSECRET
};

function googleStrategy(token, refreshToken, profile, done) {
    userModel
        .findUserByGoogleId(profile.id)
        .then(
            function(user) {
                if(user) {
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

                    return userModel.createUser(newGoogleUser)

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

app.get ('/auth/facebook', passport_assignment.authenticate('facebook', { scope : 'email' }));
app.get ('/auth/facebook/callback',
    passport_assignment.authenticate('facebook', {
        successRedirect: '/assignment/index.html#!/profile',
        failureRedirect: '/assignment/index.html#!/login'
    }), function(req, res){
        res.send(200);
    });



function localStrategy(username, password, done) {
    userModel
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
    googleConfig.callbackURL = "https://mimani-sushant-webdev.herokuapp.com/auth/google/callback"
    facebookConfig.callbackURL = "https://mimani-sushant-webdev.herokuapp.com/auth/facebook/callback"

}
else{
    googleConfig.callbackURL = "http://localhost:3000/auth/google/callback"
    facebookConfig.callbackURL = "http://localhost:3000/auth/facebook/callback"
}


passport_assignment.use(new GoogleStrategy(googleConfig, googleStrategy));
passport_assignment.use(new FacebookStrategy(facebookConfig, facebookStrategy));


function facebookStrategy(token, refreshToken, profile, done) {
    userModel
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
                    return userModel.createUser(newFacebookUser);
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
    user.password = bcrypt.hashSync(user.password);
    console.log(user);
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

function findUserByUsername(req,res) {
    var username = req.query.username;
    userModel.findUserByUsername(username)
        .then(function (user) {
            if (user) {
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
    userModel
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

