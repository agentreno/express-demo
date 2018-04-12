// Dependencies
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var slowstreamRouter = require('./routes/slowstream');

var app = express();

// Configuration of app variables
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// MIDDLEWARE?? Anything that has one of these interfaces:
// (req, res, next) => {}
// (err, req, res, next) => {}
// 
// Middlewares are called in the order they are registered

// Default application-level middlewares (built-in and third-party)
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Custom app-level middleware
app.use(function(req, res, next) {
  console.log('Hit custom app-level middleware');

  // We haven't sent a response
  // Next middleware must be called, or no response will be sent, try
  // commenting out the next line and see. It won't hit the routes, or the
  // 404 handler, or the error handler. It just hangs.
  next();
});

// App-level middlewares for a given route
// Now read routes/index.js
app.use('/', indexRouter);
app.use('/slowstream', slowstreamRouter);

// App-level middleware that calls the next middleware (error handler) with a
// 404 error. This only gets called if something prior to this didn't send a
// response.
app.use(function(req, res, next) {
  next(createError(404));
});

// Error-handling middleware
// This catches errors raised in previous middlewares and ensures a response is
// sent
app.use(function(err, req, res, next) {
  console.log('Hit the error-handling middleware');

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
