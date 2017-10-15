// Set up MySQL connection.
var mysql = require("mysql");
var connection;
//TODO:set jaws db environement variable 
if(process.env.JAWSDB_URL) {
  //Heroku deployment
    connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
  connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database : process.env.DB_NAME,
  });
}
// Make connection.
connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

// Export connection for our ORM to use.
module.exports = connection;

