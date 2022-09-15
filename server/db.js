const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "password1234",
    host: "localhost",
    port: 5432,
    database: "NHL-Encyclopedia"

});

module.exports = pool;