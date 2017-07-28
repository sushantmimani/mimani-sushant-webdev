/**
 * Created by sushantmimani on 6/25/17.
 */

var app = require('../express');
var mongoose = require('mongoose');
mongoose.Promise = require('q').Promise;

require('./services/user.service.project.server');


var connectionString = 'mongodb://127.0.0.1:27017/webdev'; // for local
if(process.env.MLAB_USERNAME_WEBDEV) { // check if running remotely
    var username = process.env.MLAB_USERNAME_WEBDEV; // get from environment
    var password = process.env.MLAB_PASSWORD_WEBDEV;
    connectionString = 'mongodb://' + username + ':' + password;
    connectionString += '@ds143231.mlab.com:43231/heroku_9cw06v5g'; // user yours
}

mongoose.connect(connectionString, { useMongoClient: true });

