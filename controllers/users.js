import {v4 as uuidv4} from 'uuid';
import time, { allTables, allUsers,allTransactions,findAge} from '../database/pg.js';

let users = [];
//initUsers()

export const createUser = (req, res) => { 
    const user = req.body;
    
    users.push({ ...user, id: uuidv4()});

    res.send(`User with the name ${user.firstName} added to the database`);

};

export const getUsers = async (req, res)=> {
    let usertable= await allUsers();
    if (usertable) {
        for (let i in usertable.rows) {
            users[i]=usertable.rows[i];
        }  
        res.send(users);   
    } else {res.send("Error")}
};

export const getUser = async (req,res) => {
    const {id }= req.params;
    users=[];
    let usertable= await allUsers();
    if (usertable) {
        for (let i in usertable.rows) {
            users[i]=usertable.rows[i];
        }
        const foundUser = users.find((user)=> user.uid == id);
        if (foundUser) {            
            res.status(200).send(foundUser);   
        } else {
            res.status(404).send('Failure');
        }
    } else {
        res.status(404).send('Failure');
    }
};


/*
export const getUser = (req,res) => {
    const {id }= req.params;
    const foundUser = users.find((user)=> user.id == id);
    res.send(foundUser);
};
*/


/*
if (!request.query.user_id) {
      console.log("Received invalid user_id: " + request.query.user_id);
      response.status(400).send("Received invalid user_id");
    } else {
      let user = database.get_user_by_user_id(request.query.user_id);
      if (user){      
        response.status(200).send(user);
      } else {
          response.status(404).send("User not found!");
      }
    }
  })
  */

export const getAge = async (req,res) => {
    console.log(req.query.age);
    let usertable = await findAge(age);
    res.status(200).send(users);
    
    /*
    if (!req.query.age) {
        console.log("Received invalid age: " + req.query.age);
        response.status(400).send("Received invalid user_id");
      } else {
        console.log('getting age');
        let usertable = await findAge(30);
        if (usertable){      
          for (let i in usertable.rows) {
            users[i]=usertable.rows[i];
            }
            res.status(200).send(users);
    
         
          } else {
              res.status(404).send('No users');
          }
      }
*/
      /*
    const age = req.query.age;
    console.log(age);
    //const {age}= req.params;
    //console.log(age);
    let usertable= await findAge(age);
    let users=[];
    if (usertable) {
        for (let i in usertable.rows) {
            users[i]=usertable.rows[i];
        }
        res.send(users);
    } else {
        res.send('No users');
    }
    */
 };

export const deleteUser = (req,res) => {
    const {id } = req.params;
    users = users.filter((user) => user.id != id);
    res.send(`User with the id ${id} deleted`);
};

export const updateUser = (req,res)=>{
    const {id} = req.params;
    const {firstName, lastName, age} = req.body;
    const user = users.find((user) => user.id == id);

    if(firstName) user.firstName = firstName;
    if(lastName) user.lastName = lastName;
    if(age) user.age  = age;

    res.send(`User with id ${id} has been updated`);
};



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

async function initUsers(req, res) {
    users =[];
    let usertable= await allUsers();

    if (usertable) {
        for (let i in usertable.rows) {
            users[i]=usertable.rows[i];
        }  
        res.send(users);   
    } else {res.send("Error")}



}

