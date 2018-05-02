const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const bodyParser = require('body-parser')
const helmet = require('helmet')

const index = require('./routes/index')
const users = require('./routes/users')
const files = require('./routes/files')
const teams = require('./routes/teams')

const app = express()

app.use(cors({origin: ['http://localhost:3000', 'http://localhost:8080'], methods: ['GET', 'PUT', 'POST', 'DELETE']}))

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(helmet())

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
// app.use(csrf({ cookie: true }));
// app.use(allowCrossDomain);

app.use('/', index)
app.use('/users', users)
app.use('/files', files)
app.use('/teams', teams)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // custom views for error
  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
