var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressHbs = require('express-handlebars'); //use express handlebars package
var mongoose = require('mongoose');
var session = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');
var port = process.env.PORT || 3000;

var routes = require('./routes/index');

var app = express();

var mongoUri = process.env.MONGO_URI

mongoose.connect(mongoUri); //slash defines db I want to use on the server; connect app to mongodb server; the connect method expects an input, the arguement we pass is the path of our server
//app.js file is where requests are handled. 
// view engine setup, register new engine, start handlebars package, pass javascript object to templating engine, default layout to Layouts, will always search for Layouts js, extension name to .hbs 
app.engine('.hbs', expressHbs({defaultLayout: 'layout', extname: '.hbs'})); 
app.set('view engine', '.hbs'); //replace hbs with .hbs to refer to new engine; create layouts sub folder; for this to work, move layouts.hbs file to layouts subfolder. Go to layouts.hbs right after <body> insert {{> header}} which is the name of the partial I want to incude, by default it will look for this file in the partials folder, all I have to do is specify header

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({secret: 'mysupersecret', resave: false, saveUninitialized: false})); //session initialization
app.use(flash()); //initialize flash needs session to intialize first
app.use(passport.initialize());
app.use(passport.session()); //set it to store the user
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);



app.listen(port, function(){
  console.log("listening in on:", port);
});
