// import {v4 as uuidv4} from 'uuid';
import time, { allTables, allItems, findUserAge,findUser, removeUser, insertUser,findItem, amendUser} from '../database/pg.js';

export const createUser = async (req, res) => { 
    //let users = [];
    
    const user = req.body;
    let result = await insertUser(user);
    if (result == 'ok') {
        //users.push({ ...user, id: uuidv4()});
        res.send(`User with the name ${user.firstname} ${user.lastname} added to the database`); 
    } else {
        res.send('Cannot add user. Check syntax');
    }
   
};

export const getUsers = async (req, res)=> {
    let users = [];

//    let usertable= await allUsers();
    let usertable= await allItems('users');
    if (usertable) {
        for (let i in usertable.rows) {
            users[i]=usertable.rows[i];
        }  
        res.send(users);   
    } else {res.send("Error")}
};

export const getUser = async (req,res) => {
    let users = [];

    const {id }= req.params;
    //expect a positive integer
    if (id> 0) {       
//        let usertable = await findUser(id);
        let usertable = await findItem(id,'users');
        
        if (usertable){      
            for (let i in usertable.rows) {
                users[i]=usertable.rows[i];
            }
            res.status(200).send(users);           
        } else {
                res.status(404).send('No users');
        }
    } else {
        res.status(404).send('Incorrect query');
    }
};


/*
export const getUser = (req,res) => {
    const {id }= req.params;
    const foundUser = users.find((user)=> user.id == id);
    res.send(foundUser);
};
*/


export const getAge =  async (req,res)=>{
    let users = [];

    let age=req.query.age;
    if (age > 0) {       
        let usertable = await findUserAge(age);
        
        if (usertable){      
            for (let i in usertable.rows) {
                users[i]=usertable.rows[i];
            }
            res.status(200).send(users);           
        } else {
                res.status(404).send('No user with this Age');
        }
    } else {
        res.status(404).send('Incorrect query');
    }
};

export const deleteUser = async (req,res) => {
    const {id }= req.params;
    
    //id must be number > 0
    if (id >0 ) {
        //check user exists
        let isuser = await findUser(id);
        
        if (isuser.rows.length > 0) {        
            //delete
            let usertable = await removeUser(id);
        
            if (usertable){       
                res.status(200).send('User with id '+id + ' deleted');
                //res.status(200).send(`User with the id ${id} deleted`);           
            } else {
                    res.status(404).send('No users');
            }
        } else {
            res.status(404).send('No users');            
        }
    } else {
        res.status(404).send('Incorrect query');
    }
    // users = users.filter((user) => user.id != id);
};

export const updateUser = async (req,res)=>{
    //let users = [];
    const {id }= req.params;
    const user = req.body;
    let result = await amendUser(user,id);

    if (result == 'ok') {
        //users.push({ ...user, id: uuidv4()});
        res.send(`User with the ID ${id} amended`); 
    } else {
        res.send('Cannot update user. Check syntax');
    }  
};

/*
const {id} = req.params;
    const {firstName, lastName, age} = req.body;
    const user = users.find((user) => user.id == id);

    if(firstName) user.firstName = firstName;
    if(lastName) user.lastName = lastName;
    if(age) user.age  = age;

    res.send(`User with id ${id} has been updated`);

*/

/*
router.patch('/:id', (req,res)=>{
    const {id} = req.params;
    const {firstName, lastName, age} = req.body;
    const user = users.find((user) => user.id == id);

    if(firstName) user.firstName = firstName;
    if(lastName) user.lastName = lastName;
    if(age) user.age  = age;

    res.send(`User with id ${id} has been updated`);
});
*/
/*
async function initUsers(req, res) {
    let users =[];
    let usertable= await allUsers();

    if (usertable) {
        for (let i in usertable.rows) {
            users[i]=usertable.rows[i];
        }  
        res.send(users);   
    } else {res.send("Error")}
}

*/

/************************** */
//Transactions
export const getTransactions = async (req, res)=> {
    let users = [];

    //let usertable= await allTransactions();
    let usertable= await allItems('transactions');

    if (usertable) {
        for (let i in usertable.rows) {
            users[i]=usertable.rows[i];
        }  
        res.send(users);   
    } else {res.send("Error")}
};

export const getTransaction = async (req,res) => {
    let users = [];

    const {id }= req.params;
    //expect a positive integer
    if (id> 0) {       
        let usertable = await findItem(id,'transactions');
        
        if (usertable){      
            for (let i in usertable.rows) {
                users[i]=usertable.rows[i];
            }
            res.status(200).send(users);           
        } else {
                res.status(404).send('No users');
        }
    } else {
        res.status(404).send('Incorrect query');
    }
};

