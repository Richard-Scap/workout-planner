// const mysql  = require('mysql');
// const config = require('../config')[process.env.NODE_ENV];

// var connection = mysql.createConnection({
//   host     : config.db.host,
//   user     : config.db.user,
//   database : config.db.db_name
// });

// connection.connect((err) => {
//   if(err) {
//     return console.log('mysql ERROR:', err);
//   }

//   var createExercise = `create table if not exists exercises(
//                     id int primary key auto_increment,
//                     name varchar(255),
//                     quantity_type varchar(20),
//                     quantity int,
//                     cooldown int
//   )`;

//   var createWorkout = `create table if not exists workouts(
//                   id int primary key auto_increment,
//                   workout_uid smallint,
//                   name varchar(255),
//                   day tinyint,
//                   exercise_id int,
//                   foreign key (exercise_id) references exercises(id)
//   )ENGINE=INNODB;`;

//   connection.query(createExercise, (error, results, fields) => {
//     if (error) throw error;
//     console.log('exercise table created!');
//   });

//   connection.query(createWorkout, (error, results, fields) => {
//     if (error) throw error;
//     console.log('workout table created!');
//   });
// });

// module.exports = connection;