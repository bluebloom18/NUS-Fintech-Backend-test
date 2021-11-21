//This module does all the connection to the database

// this segment allows the require statement in ES6
//import { createRequire } from "module";
//const require = createRequire(import.meta.url);

//ES6
import dotenv from 'dotenv';
dotenv.config();

//ES5
//require('dotenv').config();

//ES6
import * as pg from 'pg'
//const { Client } = pg.default;
const { Pool } = pg.default;

// const { Client } = require('pg');

const client = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    ssl: { rejectUnauthorized: false }
});

//table variables
const mydatabase='gb';
const myusers='gb.user';
const mytransactions='gb.transactions';

//columns- users
const age = 'age';
const uid = 'uid';

//columns- transactions
const transid = 'trans_id';

let connect = await client.connect();
//let res = 
await connect.query('SELECT $1::text as message', ['Hello world!'])
    .then(result => console.log(result.rows[0].message))
    .catch(e => console.error(e.stack))
    .then(() => connect.release());
//console.log(res.rows[0].message); // Hello world!
//await client.end();

//time
let res= await time();
console.log(res.rows[0]);

export default async function time() {
    connect = await client.connect();
    let sqlterm = 'SELECT NOW() as now';
    try {
        let sql = await connect.query(sqlterm);
        if (sql.err) {
            console.error(err);        
        }
        else { 
                return sql;
        };
    }
    finally {
        await connect.release();
    }       
}

/*
async function allUsers() {
    let sqlterm = `SELECT * from gb.user`;
    let sql = client.query(sqlterm);
    return sql;
}
*/

async function allItems(item) {
    let table;
    switch (item){
        case 'users': 
            table = myusers;
            break;
        case 'transactions': 
            table = mytransactions;
            break;
        default: table = false;
    }
    if (table){
        connect = await client.connect();
        let sqlterm = `SELECT * from ${table}`;
        try {
            let sql = await connect.query(sqlterm);
            if (sql.err) {console.error(err); }
            else { 
                console.log(`Fetched ${item}`);
                return sql;
            };
        }
        finally {
            await connect.release();
        }      
    } else {
        return 'Error wrong parameter';
    }
}


async function allTables() {
    connect = await client.connect();

    let sqlterm = `SELECT table_name FROM information_schema.tables WHERE table_schema = ${mydatabase} ORDER BY table_name`;
    try {
        let sql = await connect.query(sqlterm);
        if (sql.err) {console.error(err); }
        else { 
            console.log('Fetched tables');
            return sql;
        };
    }
    finally {
        await connect.release();
    }     
}

async function findUserAge(myage) {
    connect = await client.connect();
    
    let sqlterm = `
    SELECT *
    FROM ${myusers}
    WHERE ${age} <${myage}`;
    
    try {
        let sql = await connect.query(sqlterm); 
        if (sql.err) {console.error(err); }
        else { 
            console.log('Fetched age');
            return sql;
        };
    }
    finally {
        await connect.release();
    }       
}

async function findUser(userid) {
    connect = await client.connect();
    
    let sqlterm = `
    SELECT *
    FROM ${myusers}
    WHERE ${uid} = ${userid}`;
    
    try {
        let sql = await connect.query(sqlterm); 
        if (sql.err) {console.error(err); }
        else { 
            console.log('Fetched user');
            return sql;
        };
    }
    finally {
        await connect.release();
    }       
}

async function findItem(index,item) {
    let table, identity;
    
    switch (item){
        case 'users': 
            table = myusers;
            identity = uid;
            break;
        case 'transactions': 
            table = mytransactions;
            identity = transid;
            break;
        default: table = false;
    }
    if (table){

        connect = await client.connect();
        
        let sqlterm = `
        SELECT *
        FROM ${table}
        WHERE ${identity} = ${index}`;
        
        try {
            let sql = await connect.query(sqlterm); 
            if (sql.err) {console.error(err); }
            else { 
                console.log(`Fetched ${item}`);
                return sql;
            };
        }
        finally {
            await connect.release();
        }       
    }
}



async function insertUser(user) {
    connect = await client.connect();
    
    try {
        if(user.firstname === undefined || user.lastname === undefined || user.age === undefined || user.email === undefined || user.isparent === undefined) {
            console.log('unable to process');
            return ('error');
        } else {
                const query = `
                INSERT INTO ${myusers} ("firstname","lastname","age","email","isparent")
                VALUES ('${user.firstname}','${user.lastname}','${user.age}','${user.email}','${user.isparent}')`;
                
                let sql = await connect.query(query);

                if (sql.err) {
                        console.error(err);
                        return 'error'
                            
                } else {
                       console.log('Data insert successful');
                       return 'ok'
                        
                }
        }      
    }
    finally {
        await connect.release();
    }              
}

async function amendUser(user,id) {
    connect = await client.connect();
    
    try {
                   
            let fields = Object.entries(user);
            
            let mytext=''
            
            for (let item=0; item < fields.length; item++) {
                //ignore null
                if (fields[item][1]=== null ||fields[item][1]=== undefined) {
                    //do nothing
                } else {
                    mytext = mytext+ fields[item][0]+'=\''+fields[item][1]+'\', '
                }  
            }
            //remove last comma
            mytext = mytext.replace(/, $/," ");

            
                const query = `
                UPDATE ${myusers} SET ${mytext} WHERE ${uid}=${id}`;
                
                let sql = await connect.query(query);

                if (sql.err) {
                        console.error(err);
                        return 'error'
                            
                } else {
                       console.log('Data update successful');
                       return 'ok'
                        
                }
        }      
    
    finally {
        await connect.release();
    }              
}


async function removeUser(userid) {
    connect = await client.connect();
    
    let sqlterm = `
    DELETE FROM ${myusers}
    WHERE ${uid} = ${userid}`;

    try {
        let sql = await connect.query(sqlterm); 
        if (sql.err) {console.error(err); }
        else { 
            console.log('Deleted user');
            return sql;
        };
    }
    finally {
        await connect.release();
    }                
}

export {
    allTables,
    allItems,
    findUser,
    insertUser,
    removeUser,
    amendUser,
    findUserAge,
    findItem
};


/* put unused functions here
async function allUsers() {
    connect = await client.connect();
    let sqlterm = `SELECT * from ${myusers}`;
    try {    
        let sql = await connect.query(sqlterm);
        if (sql.err) {console.error(err); }
        else { 
            console.log('Fetched users');
            return sql;
        };
    }
    finally {
        await connect.release();
    }
}

async function allTransactions() {
    connect = await client.connect();
    let sqlterm = `SELECT * from ${mytransactions}`;
    try {
        let sql = await connect.query(sqlterm);
        if (sql.err) {console.error(err); }
        else { 
            console.log('Fetched transactions');
            return sql;
        };
    }
    finally {
        await connect.release();
    }   
}
*/