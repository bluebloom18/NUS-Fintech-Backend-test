import express from 'express';

import {createUser, getUsers, getUser, deleteUser, updateUser, getAge} from '../controllers/users.js';
import { findAge } from '../database/pg.js';

const router = express.Router();

router.get('/all', getUsers);

//all routes here start with /users

router.get('/:id',getUser);

//router.get('/user',getAge);

router.get('/user', async (req,res)=>{
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


router.post('/', createUser);

router.delete('/:id', deleteUser);

router.patch('/:id', updateUser);

export default router;
