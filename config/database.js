const { Pool } = require('pg');
const config = require('../config')[process.env.NODE_ENV];

const pool = new Pool({
  user: config.pg_user,
  host: config.ph_host,
  database: config.db_name,
  password: config.password,
  port: config.pg_port
});

// the pool with emit an error on behalf of any idle clients
// it contains if a backend error or network partition happens
pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
})

const createTables = `CREATE TABLE IF NOT EXISTS workouts(
                        ID SERIAL PRIMARY KEY,
                        NAME TEXT);

                      CREATE TABLE IF NOT EXISTS circuits(
                        ID SERIAL PRIMARY KEY,
                        NAME CHAR(30),
                        REPETITIONS INT,
                        REST INT,
                        WORKOUT_ID INT REFERENCES workouts (ID));

                      CREATE TABLE IF NOT EXISTS exercises(
                        ID SERIAL PRIMARY KEY,
                        NAME CHAR(30),
                        TYPE CHAR(30),
                        WORKOUT_ID INT REFERENCES workouts (ID),
                        CIRCUIT_ID INT REFERENCES circuits(ID));`

pool.query(createTables, null, (err, res) => {
  if (err) {console.log('DB ERROR', err)}
  console.log('DB ready');
  console.log('db res', res);
})

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback)
  }
}