
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

console.log(PG_DATABASE, PG_HOST, PG_USER, PG_PASSWORD);

const pool = new Pool({
  user: PG_USER,
  host: PG_HOST,
  database: PG_DATABASE,
  password: PG_PASSWORD,
  port: 5432, // default Postgres port
  ssl: {
    rejectUnauthorized: false,
  }
});

pool.connect(); // conexion a base de datos

pool.query(`SELECT card.*,
  json_agg( attribute.name) AS attributes,
  json_agg( card_attribute.value) AS attributes_value,
  json_agg( common_effect.description) AS common_effects,
  json_agg( common_effect.value) AS common_effects_values 

  FROM card
  LEFT JOIN card_attribute ON card.card_id = card_attribute.card_id
  LEFT JOIN attribute ON card_attribute.attribute_id = attribute.attribute_id
  LEFT JOIN card_common_effect ON card.card_id = card_common_effect.card_id
  LEFT JOIN common_effect ON card_common_effect.common_effect_id = common_effect.common_effect_id
  GROUP BY card.card_id, card.name;
`, (error, response) => {
  if(!error){
    console.log(response.rows);
  }else{
    console.log(error.message);
  
  }
  pool.end(); // end connection
})

app.get('/index', (req, res) => {
    res.send("hello world");
})

