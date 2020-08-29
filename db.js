const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "aspirin",
  database: "practice",
  host: "localhost",
  port: 5432,
});

module.exports = pool;
