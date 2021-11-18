// this allows the require statement in ES6
//import { createRequire } from "module";
//const require = createRequire(import.meta.url);

//ES6
import dotenv from 'dotenv';
dotenv.config();

//ES5
//require('dotenv').config();

//ES6
import * as pg from 'pg'
const { Client } = pg.default;
const { Pool } = pg.default;


// const { Client } = require('pg');

const client = new Client({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    ssl: { rejectUnauthorized: false }
});

await client.connect();
let res = await client.query('SELECT $1::text as message', ['Hello world!']);
console.log(res.rows[0].message); // Hello world!

// res =  await client.query('SELECT NOW() as now');
res= await time();
console.log(res.rows[0]);

/*
res= await allTables();
for (let i in res.rows) {
    console.log(res.rows[i]);
}

res= await allUsers();
if (res) {
    for (let i in res.rows) {
        console.log(res.rows[i]);
    }
}
  
res= await allTransactions();
if (res) {
    for (let i in res.rows) {
        console.log(res.rows[i]);
    }
}

res= await findAge(30);
if (res) {
    for (let i in res.rows) {
        console.log(res.rows[i]);
    }  
}
*/

//await client.end()

export default async function time() {
    let sqlterm = 'SELECT NOW() as now';
    let sql = await client.query(sqlterm);
    if (sql.err) {console.error(err); }
    else { 
        return sql;
    };
}


/*
async function allUsers() {
    let sqlterm = `SELECT * from gb.user`;
    let sql = client.query(sqlterm);
    return sql;
}
*/

async function allUsers() {
    let sqlterm = `SELECT * from gb.user`;
    
    let sql = await client.query(sqlterm);
    if (sql.err) {console.error(err); }
    else { 
        console.log('Fetched users');
        return sql;
    };
}

async function allTransactions() {
    let sqlterm = 'SELECT * from gb.transactions';
    let sql = await client.query(sqlterm);
    if (sql.err) {console.error(err); }
    else { 
        console.log('Fetched transactions');
        return sql;
    };
}

async function allTables() {
    let sqlterm = `SELECT table_name FROM information_schema.tables WHERE table_schema = 'gb' ORDER BY table_name`;
    let sql = await client.query(sqlterm);
    if (sql.err) {console.error(err); }
    else { 
        console.log('Fetched tables');
        return sql;
    };
}

async function findAge(age) {
    let sqlterm = `
    SELECT *
    FROM gb.user
    WHERE age<${age}`;
    
    let sql = await client.query(sqlterm); 
    if (sql.err) {console.error(err); }
    else { 
        console.log('Fetched age');
        return sql;
    };
}

async function insertUser() {
    const query = `
    INSERT INTO users (email, firstName, lastName, age)
    VALUES ('johndoe@gmail.com', 'john', 'doe', 21)
    `;
    client.query(query, (err, res) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log('Data insert successful');
        client.end();
    });
}

export {
    allTables,
    allUsers,
    allTransactions,
    findAge
};
  
/*
async function time() {
    let sql =  client.query('SELECT NOW() as now', (err, res) => {
        if (err) {
          console.log(err.stack);
        } else {
            return sql;
        }
    });
}
*/

