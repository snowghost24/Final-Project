var express = require('express');
var app = express();
var exphbs = require('express-handlebars');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var socket = require('socket.io')
require('dotenv').config()

// mysql is required in the connection file 

var PORT = process.env.PORT || 8080;

app.engine('handlebars', exphbs({defaultLayout:'main'}) );
app.set('view engine', 'handlebars');


var routes = require("./routes/controller.js")
app.use("/", routes);


//required for passport
var options;
if (process.env.JAWSDB_URL) {
    //Heroku deployment
    options = {
      host: process.env.PRODUCTION_DB_HOST,
      user: process.env.PRODUCTION_DB_USER,
      password: process.env.PRODUCTION_DB_PASSWORD,
      database: process.env.PRODUCTION_DB_NAME,
      port:PORT
    };
} else {
    options = {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    };
}

var sessionStore = new MySQLStore(options);
app.use(session({
    secret: 'aritzahadababyitzagirl', // session secret
    store: sessionStore,
    resave: true,
    saveUninitialized: false
}));




// ──────────GOOOGLE TRANSLATER ──────────────────────────────────────────────

//TODO:view google translate documentation in the following link.
//https://googlecloudplatform.github.io/google-cloud-node/#/docs/translate/1.0.0/translate

// const Translate = require('@google-cloud/translate');

// // Your Google Cloud Platform project ID
// const projectId = 'celtic-client-183119';

// // Instantiates a client
// const translateClient = Translate({
//   projectId: projectId,

// });

// // The text to translate
// const text = 'Hello, world!';
// // The target language
// const target = 'ru';

// // Translates some text into Russian
// translateClient.translate(text, target)
//   .then((results) => {
//     const translation = results[0];

//     console.log(`Text: ${text}`);
//     console.log(`Translation: ${translation}`);
//   })
//   .catch((err) => {
//     console.error('ERROR:', err);
//   });
// ────────────────────────────────────────────────────────────────────────────────




  var server = app.listen(PORT,() => {
    console.log(`You are listening through port ${PORT}`);
 });


 var io = socket(server);
 io.on('connection', function(socket){
  console.log(`made connection ${socket.id}` );

  socket.on('chat',function(data){
io.sockets.emit('chat', data);
  })
 });


