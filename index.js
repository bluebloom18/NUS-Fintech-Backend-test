import express from 'express';
import bodyParser from 'body-parser';

import usersRoutes from './routes/usersRoutes.js';

const app = express();
const PORT = process.env.PORT || 80;

app.use(bodyParser.json());

app.use('/', usersRoutes);

let hometext = `Hello from homepage.
<h1>
APIs are:
</h1>
<h2>GET:</h2>
<ul>
<li>/users/all</li>
<li>/users/:id</li>
<li>/users/?age=20</li>
<li>/transactions/all</li>
<li>/transactions/:id</li>
</ul>

<h2>CREATE:</h2>
<ul>
<li>/users/ </li>
</ul>

<h2>DELETE:</h2>
<ul>
<li>/users/:id </li>
</ul>

<h2>UPDATE:</h2>
<ul>
<li>/users/:id </li>
</ul>

`

app.get('/', (req,res)=>{
    res.send(hometext);
});

app.listen(PORT, () => console.log(`Server running on Port: http://localhost:${PORT}`));
