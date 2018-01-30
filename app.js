var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var csrf = require('csurf');

var bodyParser = require('body-parser');
var helmet = require('helmet');
var session = require('express-session');
var FileStore = require('session-file-store')(session);

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(session({
    store: new FileStore,
    secret: '%_cWsXQBZFD39274',
    resave: true,
    saveUninitialized: true
}));
app.use(helmet());

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(csrf({ cookie: true }));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // custom views for error
    if (err.status !== 200) {
        if ((err.status).toString().startsWith("40")) {
            res.render('errors/40x')
        } else if (err.status.toString().startsWith("50")) {
            res.render('errors/50x')
        } else {
            // render the error page
            res.status(err.status || 500);
            res.render('error');
        }
    }
});

module.exports = app;
