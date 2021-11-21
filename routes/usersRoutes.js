import express from 'express';

import {createUser, getUsers, getUser, deleteUser, updateUser, getAge, getTransactions, getTransaction} from '../controllers/users.js';

const router = express.Router();

//all routes here start with /users

router.get('/users/all', getUsers);

router.get('/users/:id',getUser);

router.get('/users/',getAge); //?age=20 gets all uses younger than 20

router.post('/users/', createUser);

router.delete('/users/:id', deleteUser);

router.patch('/users/:id', updateUser);

router.get('/transactions/all', getTransactions);

router.get('/transactions/:id', getTransaction);

router.use((error, req, res, next)=> {
    return res.status(500).json({ error: error.toString()});
})

export default router;
