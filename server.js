var app = require('./express');
var bodyParser = require('body-parser');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var session      = require('express-session');

app.use(cookieParser());
app.use(session({ secret: "random text" }));
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// app.set('view engine', 'ejs');
// require('./utilities/filelist');


app.use(app.express.static(__dirname + '/public'));


require('./assignment/app');
require('./project/app');


app.listen(process.env.PORT || 3000, function () {
    console.log("Server started")
    
});