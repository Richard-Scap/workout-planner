const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();
const app = express();
const logger = require('morgan');
const config = require('./config')[process.env.NODE_ENV];
const status = require('./routes/status');
const workouts = require('./routes/workouts');

//* middleware, ensure this loads first*//
// setup request / response middleware
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

//* Home Endpoint *//
app.get('/', (req, res) => {
  res.send('Hello World!')
})

//* load javascripts and stylesheets
app.use(express.static(__dirname + '/public'));

//* Controllers *//
app.use('/status', status);
app.use('/workouts', workouts);

// set engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

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

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(process.env.PORT || 3000, () => console.log("Express server listening on port %o in %s mode", process.env.PORT || 3000, process.env.NODE_ENV))