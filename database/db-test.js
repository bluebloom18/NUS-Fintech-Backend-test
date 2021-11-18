import mysql from 'mysql';

var con = mysql.createConnection({
  host: "localhost",
  user: "newuser",
  password: "newpassword",
  debug: true
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query('Show databases;', function (err, result) {
    if (err) throw err;
    console.log("Result: " + result);
  });
});
