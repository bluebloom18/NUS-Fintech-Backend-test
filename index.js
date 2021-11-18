import express from 'express';
import bodyParser from 'body-parser';

import usersRoutes from './routes/usersRoutes.js';
import { findAge } from './database/pg.js';

const app = express();
const PORT = 5000;

app.use(bodyParser.json());

/*
app.get('/users/user', async (req,res)=>{
    console.log(req.query.age);
    let sql = await findAge(req.query.age);
    let users=[];
    if (sql){      
        for (let i in sql.rows) {
          users[i]=sql.rows[i];
          }
          res.status(200).send(users);
  
       
        } else {
            res.status(404).send('No users');
        }
//    res.send(sql);
});
*/

app.use('/users', usersRoutes);

app.get('/', (req,res)=>{
    res.send('Hello from homepage.');
});

app.listen(PORT, () => console.log(`Server running on Port: http://localhost:${PORT}`));
