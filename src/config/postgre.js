const { Pool } = require("pg");

const connectionString = `postgres://${process.env.KETIKSAN_DATABASE_USER}:${process.env.KETIKSAN_DATABASE_PASSWORD}@${process.env.KETIKSAN_DATABASE_HOST}:${process.env.KETIKSAN_DATABASE_PORT}/${process.env.KETIKSAN_DATABASE_NAME}`;

const pool = new Pool({
  connectionString,
});

module.exports = pool;
