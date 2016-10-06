var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressHbs = require('express-handlebars'); //use express handlebars package
var mongoose = require('mongoose');

var routes = require('./routes/index');

var app = express();

mongoose.connect('localhost:27017/shopping'); //slash defines db I want to use on the server; connect app to mongodb server; the connect method expects an input, the arguement we pass is the path of our server
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
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
