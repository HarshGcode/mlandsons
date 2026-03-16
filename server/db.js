const { Pool } = require('pg');

// Use environment variables for database credentials — NEVER hardcode secrets
const pool = new Pool({
  database: process.env.DB_NAME || 'MLANDSONS',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT, 10) || 5432,
});

module.exports = pool;
