const express = require('express');
const db = require('../config/database');
const router = express.Router();


router.get('/', (req, res, next) => {
  var sql = "SELECT * FROM workouts;";
  var result;

  db.query(sql, function(error, results, fields) {
    if (error) throw error;
    res.send(JSON.stringify(results))
  });

})

//TODO finish create route
router.post('/new', (req, res, nex) => {
  var sql = `INSERT INTO workouts (name, day, exercise_id, workout_uid)
             VALUES ( ${req.somevar}`

})

module.exports = router;