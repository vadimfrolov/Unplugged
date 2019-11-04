var createError = require('http-errors');
var express = require('express');
const session = require('express-session');
var path = require('path');
var logger = require('morgan');
const FacebookStrategy = require('passport-facebook');
const cookieParser = require('cookie-parser');
const cors = require("cors");
const { connect } = require('mongoose');
const bodyParser = require("body-parser");
const passport = require('passport');
const FileStore = require('session-file-store')(session);



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var testAPIRouter = require("./routes/testAPI");
var instaRouter = require('./routes/insta');

var app = express();

// passport

app.use(
  session({
    store: new FileStore({}),
    key: 'user_sid',
    secret: 'anything here',
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60000000,
    },
  }),
);

app.use(passport.initialize());
app.use(passport.session());

// mongoose 

connect("mongodb://localhost:27017/final", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/testAPI", testAPIRouter);
app.use('/insta', instaRouter);

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