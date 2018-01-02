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
  var id = req.params.id;
  db.query(sql, [id], (err, res) => {
    if (err) {
      return next(err);
    }
    res.send(res.rows[0]);
    console.log('result', res);
  })
})

//TODO finish create route
router.post('/create', (req, res, next) => {
  console.log('POST REQUEST', req.body);
  var response = {}
  var params = req.body;

  res.send(req.body);
  var sqlWorkouts = 'INSERT INTO workouts (name) VALUES ($1)'

  db.query(sqlWorkouts, [params.name], (err, res) => {
    if (err) { console.log('DB ERROR', err) }
    console.log('RESPONSE', res);
    // response.workout = res.rows[0]
  })

  // var sql = `INSERT INTO circuits (name, repetitions, rest, workout_id)
  // VALUES("circuit0", ${params.sets}, ${params.rest}, workout_id)`

  // db.query(sql, null, (err, res) => {
  //   console.log(res.rows[0]);
  //   response.circuits = res.rows[0]
  // })

  // var sql = `INSERT INTO exercises (name, repetitions, rest, workout_id)
  // VALUES("circuit0", ${params.sets}, ${params.rest}, workout_id)`

  // db.query(sql, null, (err, res) => {
  //   console.log(res.rows[0]);
  //   response.exercises = res.rows[0]
  // })

})

module.exports = router;