const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.KETIKSAN_DATABASE_USER,
  host: process.env.KETIKSAN_DATABASE_HOST,
  database: process.env.KETIKSAN_DATABASE_DATABASE,
  password: process.env.KETIKSAN_DATABASE_PASSWORD,
  port: process.env.KETIKSAN_DATABASE_PORT,
});

module.exports = pool;
