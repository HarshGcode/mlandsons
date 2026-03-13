const { Pool } = require('pg');

const pool = new Pool({
  database: 'MLANDSONS',
  user: 'postgres',
  password: 'password',
  host: 'localhost',
  port: 5432,
});

module.exports = pool;
