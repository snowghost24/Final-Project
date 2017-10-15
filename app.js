var express = require('express');
var app = express();
var exphbs = require('express-handlebars');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
// mysql is required in the connection file 

var PORT = process.env.PORT || 8080;

app.engine('handlebars', exphbs({defaultLayout:'main'}) );
app.set('view engine', 'handlebars');


var routes = require("./routes/controller.js")
app.use("/", routes);


// required for passport
// var options;
// if (process.env.JAWSDB_URL) {
//     //Heroku deployment
//     options = {
//       host: process.env.PRODUCTION_DB_HOST,
//       user: process.env.PRODUCTION_DB_USER,
//       password: process.env.PRODUCTION_DB_PASSWORD,
//       database: process.env.PRODUCTION_DB_NAME,
//       port:PORT
//     };
// } else {
//     options = {
//         host: process.env.DB_HOST,
//         user: process.env.DB_USER,
//         password: process.env.DB_PASSWORD,
//         database: process.env.DB_NAME
//     };
// }

// var sessionStore = new MySQLStore(options);
// app.use(session({
//     secret: 'aritzahadababyitzagirl', // session secret
//     store: sessionStore,
//     resave: true,
//     saveUninitialized: false
// }));


app.listen(PORT,() => {
   console.log(`You are listening through port ${PORT}`);
})