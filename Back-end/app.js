var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var sign_in = require('./routes/sign-in')
var register = require('./routes/register')
var find_user = require('./routes/find-user')
var Create_circle = require('./routes/Create-Circle')
var get_circle_list = require('./routes/get-circle-list')
var search_circle = require('./routes/search-circle')
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/sign-in', sign_in)
app.use('/register', register)
app.use('/find-user', find_user)
app.use('/create-circle', Create_circle)
app.use('/get-circle-list', get_circle_list)
app.use('/search', search_circle)
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
