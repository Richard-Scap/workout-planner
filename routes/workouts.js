const express = require('express');
const db = require('../config/database');
const router = express.Router();


router.get('/', (req, res, next) => {
  var sql = "SELECT * FROM workouts;";
  var queryResult;
  var that = this;

  // db.query(sql, function(error, results, fields) {
  //   if (error) throw error;
  //   that.queryResult = results;
  // });
  console.log('queryResult:', that.queryResult);
  res.render('index', {title: "Work it outttt"});
})

//TODO finish create route
router.post('/new', (req, res, nex) => {
  var sql = `INSERT INTO workouts (name, day, exercise_id, workout_uid)
             VALUES ( ${req.somevar}`

})

module.exports = router;