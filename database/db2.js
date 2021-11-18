import { createRequire } from "module";
const require = createRequire(import.meta.url);

const mysql = require('mysql');
const express = require('express');

const pool = mysql.createPool({
    connectionLimit : 100, //important
    host     : 'localhost',
    user     : 'root',
    password : 'Mysql2021!',
    database : 'todolist',
    debug    :  false
});

// add rows in the table

function addRow(data) {
    let insertQuery = 'INSERT INTO ?? (??,??) VALUES (?,?)';
    let query = mysql.format(insertQuery,["todo","user","notes",data.user,data.value]);
    pool.query(query,(err, response) => {
        if(err) {
            console.error(err);
            return;
        }
        // rows added
        console.log(response.insertId);
    });
}

// timeout just to avoid firing query before connection happens

setTimeout(() => {
    // call the function
    addRow({
        "user": "Shahid",
        "value": "Just adding a note"
    });
},5000);