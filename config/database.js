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


module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback)
  }
}