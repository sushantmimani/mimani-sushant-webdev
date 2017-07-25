/**
 * Created by sushantmimani on 6/26/17.
 */

var app = require('../../express');
var userId;
var userModel = require('../models/user/user.model.server');
var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new LocalStrategy(localStrategy));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

app.get ('/api/project/user', findUserByCredentials);
app.get ('/api/project/user/:userId',findUserById );
app.get ('/api/project/username',findUserByUsername);
app.post ('/api/project/user', createUser);
app.put  ('/api/project/user/:userId', updateUser);
app.delete ('/api/project/user/:userId', deleteUser);
app.post('/api/project/login', passport.authenticate('local'), login);
// app.post  ('/api/logout', logout);
// app.post  ('/api/register', register);

function authorized (req, res, next) {
    if (!req.isAuthenticated()) {
        res.send(401);
    } else {
        next();
    }
};

app.get ('/auth/project/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
app.get('/auth/project/google/callback',
    passport.authenticate('google', {
        successRedirect: '/project/index.html#!/search',
        failureRedirect: '/project/index.html#!/login'
    }));


app.get ('/auth/project/facebook', passport.authenticate('facebook', { scope : 'email' }));
app.get('/auth/project/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/project/index.html#!/search',
        failureRedirect: '/project/index.html#!/login'
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

// var googleConfig = {
//     clientID: process.env.GOOGLE_CLIENTID,
//     clientSecret: process.env.GOOGLE_CLIENTSECRET
// }

var googleConfig = {
    clientID: "325753145858-pgfuubsu4d78phk7rj1q6om09grdeshc.apps.googleusercontent.com",
    clientSecret: "_K8ZO1hiYApx2j3KFsRqxBl_"
};

// var facebookConfig = {
//     clientID: process.env.FACEBOOK_CLIENTID,
//     clientSecret: process.env.FACEBOOK_CLIENTSECRET
// }

var facebookConfig = {
    clientID: "2375254732699106",
    clientSecret: "f3de6e23000094e0eafdcea991572ab0"
}

if(process.env.MLAB_USERNAME_WEBDEV) {
    googleConfig.callbackURL = "https://mimani-sushant-webdev.herokuapp.com/auth/google/callback"
    facebookConfig.callbackURL = "https://mimani-sushant-webdev.herokuapp.com/auth/facebook/callback"

}
else{
    googleConfig.callbackURL = "http://127.0.0.1:3000/auth/google/callback"
    facebookConfig.callbackURL = "http://127.0.0.1:3000/auth/facebook/callback"
}



passport.use(new GoogleStrategy(googleConfig, googleStrategy));
passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));


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

function googleStrategy(token, refreshToken, profile, done) {
    userModel
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
    var user = req.user;
    res.json(user);
}

function logout(req, res) {
    req.logOut();
    res.send(200);
}

function loggedin(req, res) {
    res.send(req.isAuthenticated() ? req.user : '0');
}
