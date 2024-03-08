
require('dotenv').config()
const { Pool } = require('pg');
const express = require('express')
const app = express()
const port = 3000



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

const PG_HOST       = process.env.PG_HOST;
const PG_DATABASE   = process.env.PG_DATABASE;
const PG_USER       = process.env.PG_USER;
const PG_PASSWORD   = process.env.PG_PASSWORD;

console.log(PG_DATABASE);

const pool = new Pool({
  user: PG_USER,
  password: PG_PASSWORD,
  host: PG_HOST,
  port: 5432, // default Postgres port
  database: PG_DATABASE
});

app.get('/index', (req, res) => {
    res.send("hello world!")

})

