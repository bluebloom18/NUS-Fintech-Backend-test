import express from 'express';
import bodyParser from 'body-parser';

import usersRoutes from './routes/usersRoutes.js';

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.use('/', usersRoutes);

app.get('/', (req,res)=>{
    res.send('Hello from homepage.');
});

app.listen(PORT, () => console.log(`Server running on Port: http://localhost:${PORT}`));
