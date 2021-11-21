import { createRequire } from "module";
const require = createRequire(import.meta.url);

const express = require("express");
const app = express();
const mysql = require('mysql');

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'newuser',
  password : 'newpassword',
  database : 'mydb'
});

/*
//create database
connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    connection.query("CREATE DATABASE mydb", function (err, result) {
        if (err) throw err;
        console.log("Database created");
      });
  });

*/

//create table

/*
connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "CREATE TABLE customers (name VARCHAR(255), address VARCHAR(255))";
    connection.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Table created");
    });
  });

*/
//alter table
/*
connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "ALTER TABLE customers ADD COLUMN id INT AUTO_INCREMENT PRIMARY KEY";
    connection.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Table altered");
    });
  });
*/

//insert

/*
connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "INSERT INTO customers (name, address) VALUES ('Company Inc', 'Highway 37')";
    connection.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
    });
  });

*/
// insert many

/*
connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "INSERT INTO customers (name, address) VALUES ?";
    var values = [
      ['John', 'Highway 71'],
      ['Peter', 'Lowstreet 4'],
      ['Amy', 'Apple st 652'],
      ['Hannah', 'Mountain 21'],
      ['Michael', 'Valley 345'],
      ['Sandy', 'Ocean blvd 2'],
      ['Betty', 'Green Grass 1'],
      ['Richard', 'Sky st 331'],
      ['Susan', 'One way 98'],
      ['Vicky', 'Yellow Garden 2'],
      ['Ben', 'Park Lane 38'],
      ['William', 'Central st 954'],
      ['Chuck', 'Main Road 989'],
      ['Viola', 'Sideway 1633']
    ];
    connection.query(sql, [values], function (err, result) {
      if (err) throw err;
      console.log("Number of records inserted: " + result.affectedRows);
    });
  });
*/
  connection.connect(function(err) {
    if (err) throw err;
    connection.query("SELECT * FROM customers", function (err, result, fields) {
      if (err) throw err;
      console.log(result);
    });
  });

