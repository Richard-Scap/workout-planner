const express = require('express');
const db = require('../config/database');
const router = express.Router();


router.get('/new', (req, res, next) => {
  console.log('response status:', res.statusCode);
  res.render('index');
})

router.get('/:id', (req, res, next) => {
  var result;
  var sql = "SELECT * FROM workouts;"
  db.query(sql, [id], (err, res) => {
    if (err) {
      return next(err);
    }
    result = res.rows[0];
    console.log('result', res);
  })
})

//TODO finish create route
router.post('/new', (req, res, nex) => {
  console.log('request', req);
  res.send('Check yo self', res);
  // var sql = `INSERT INTO workouts (name, day, exercise_id, workout_uid)
  //            VALUES ( ${req.somevar}`

})

module.exports = router;