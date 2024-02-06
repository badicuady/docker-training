"use strict";

const express = require("express");
const mysql = require("mysql");
var cors = require("cors");

const app = (module.exports = express());

var corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

const pool = mysql.createPool({
    connectionLimit: 50,
    host: "mysql",
    user: "root",
    password: "123456",
    database: "test",
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

app.get("/", (req, res) => res.send(`Hello World ... ${req.query.test ?? ""}`));

app.get("/about", (req, res) =>
    res.send(`This is the about page ... ${req.query.test ?? ""}`)
);

app.get("/list", (req, res) => {
    const filterId = req.query.id ?? 0;
    let query = "SELECT `id`, `name` FROM `test`";
    if (filterId > 0) {
        query += " WHERE `id` = ?";
    }

    pool.query(query, filterId, (err, result) => {
        if (err) {
            console.error(err);
        }
        res.send(result);
    });
});

const PORT = 3100;

if (!module.parent) {
    app.listen(PORT, "0.0.0.0", function (err) {
        if (err) console.error("Error in server setup", err);
        console.info(`Express started on port ${PORT}`);
    });
}
