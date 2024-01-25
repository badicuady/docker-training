'use strict';

const express = require('express');
const mysql = require('mysql');

const app = module.exports = express();
const pool = mysql.createPool({
  connectionLimit : 50,
  host: "sample3-mysql",
  user: "root",
  password: "123456",
  database: "sample3"
}); 

const template = (str) => 
`
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="utf-8" \/>
    <meta name="viewport" content="width=device-width, initial-scale=1" \/>
    <title>Contents of test table<\/title>
  <\/head>
  <body>
    <pre><code>${str}<\/code><\/pre>
  <\/body>
  <\/html>
`;

app.get('/', (req, res) => res.send(`Hello World ... ${req.query.test ?? ''}`));

app.get('/about', (req, res) => res.send(`This is the about page ... ${req.query.test ?? ''}`));

app.get('/list', (req, res) => {
  const filterId = req.query.id ?? 0;
  let query = "SELECT `id`, `name` FROM `test`";
  if (filterId > 0) {
    query += " WHERE `id` = ?";
  }

  pool.query(query, filterId, (err, result) => {
    if (err) { console.error(err); }    
    res.send(template(JSON.stringify(result, null, 4)));
  });
});

if (!module.parent) {
  app.listen(3000);
  console.info('Express started on port 3000');
}
