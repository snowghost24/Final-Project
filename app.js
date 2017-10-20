var express = require('express');
var app = express();
var exphbs = require('express-handlebars');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var socket = require('socket.io');
var bodyParser = require('body-parser');
var watson = require('watson-developer-cloud');
var ConversationV1 = require('watson-developer-cloud/conversation/v1');
var axios = require('axios');
require('dotenv').config()
// mysql is required in the connection file 

var PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');


var routes = require("./routes/controller.js")
app.use("/", routes);

// ───────SESSION STORAGE CONNECTTION─────────────────────────────────

//required for passport
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


// ──────────GOOOGLE TRANSLATER AND ──────────────────────────────────────────────
// Instantiates a client

// The text for which to detect language, e.g. "Hello, world!"
// const text = 'Hello, world!';

// Detects the language. "text" can be a string for detecting the language of
// a single piece of text, or an array of strings for detecting the languages
// of multiple texts.

//TODO:view google translate documentation in the following link.
//https://googlecloudplatform.github.io/google-cloud-node/#/docs/translate/1.0.0/translate

var textToFront;
var supplyText;
var sayHello;

const Translate = require('@google-cloud/translate');
// Your Google Cloud Platform project ID
const projectId = 'celtic-client-183119';
// Instantiates a client
const translateClient = Translate({
    projectId: projectId,

});

function translateIt(wasSaid,data) {
    // The text to translate
    let text = wasSaid;
    // The target language
    const target = 'es';



// ───────DETECTS LANGUAGE SPOKEN─────────────────────────────────────────
    const translate = Translate();
    translate.detect(text)
      .then((results) => {
        let detections = results[0];
        detections = Array.isArray(detections) ? detections : [detections];
    
        console.log('Detections:');
        detections.forEach((detection) => {
          console.log(`${detection.input} => ${detection.language}`);
        });
      })
      .catch((err) => {
        console.error('ERROR:', err);
    });


// ────────TRANSLATES TEXT─────────────────────────────────────────────────
    translateClient.translate(text, target)
        .then((results) => {
            const translation = results[0];
            // console.log(`Text: ${text}`);
            // console.log(`Translation: ${translation}`);
            sayHello(translation,data);
            console.log(data);  
        })
        .catch((err) => {
            console.error('ERROR:', err);
        });
}


// ──SOCKET CONFIGURATION────────────────────────────────────────────────────────────────
var server = app.listen(PORT, () => {
    console.log(`You are listening through port ${PORT}`);
});
var io = socket(server);
io.on('connection', function (socket) {
    console.log(`made connection ${socket.id}`);
    socket.on('chat', function (data) {
        translateIt(data.message,data)
        sayHello = function(translation,data){
 var passBack = {
            chatData: data,
            transText:translation
     }
       io.sockets.emit('chat', passBack);
             console.log(`Translation: ${translation}`);
            console.log("hello");
        }
    })
});


