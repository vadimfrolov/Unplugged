const createError = require('http-errors');
const express = require('express');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const passport = require('passport');

const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require("cors");

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const testAPIRouter = require("./routes/testAPI");
const useractivityRouter = require("./routes/userActivity")
const initPassport = require('./passport/init');

const app = express();

app.use(
  session({
    store: new FileStore({logFn: function(){}}),
    key: 'user_sid',
    secret: 'anything here',
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60000000,
    },
  }),
);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Mongoose
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/final", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use('/', indexRouter);
app.use('/users/', usersRouter);
app.use("/testAPI", testAPIRouter);
app.use('/useractivity', useractivityRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
