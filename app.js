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
    const target = 'en';



// ───────DETECTS LANGUAGE SPOKEN─────────────────────────────────────────
    // const translate = Translate();
    // translate.detect(text)
    //   .then((results) => {
    //     let detections = results[0];
    //     detections = Array.isArray(detections) ? detections : [detections];
    
    //     console.log('Detections:');
    //     detections.forEach((detection) => {
    //       console.log(`${detection.input} => ${detection.language}`);
    //     });
    //   })
    //   .catch((err) => {
    //     console.error('ERROR:', err);
    // });


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



// ────────────────────────────────────────────────────────────────────────────────

//set up global variables
var theInfo = "";
var reRun = false;
var myQuestion = "";
var collectedValues = [];
var passNewMessage;
var sentQuestions = "";
var newData = {}
var runIo;
var io;
var userData;


// everytime watson sents back a response the question object is updated by this function
function setQuestion(sentQuestions1) {
  sentQuestions = sentQuestions1;
  newData = { message: sentQuestions };
  runIo();
}


// ──SOCKET CONFIGURATION────────────────────────────────────────────────────────────────
var server = app.listen(PORT, () => {
    console.log(`You are listening through port ${PORT}`);
});
var io = socket(server);
io.on('connection', function (socket) {
    console.log(`made connection ${socket.id}`);
// ────────────────────────────────────────────────────────────────────────────────
var x = 1

  // This emit is used only for watson's first message
  socket.on('start', function (data) {
  })
  do { socket.emit('start', newData); } while (x == 2)
  socket.on('chat', function (data) {
    reRun = true;
    passNewMessage(data.message);
    console.log("-------------");
    console.log(data.message)
    console.log("-------------");
  });
// ────────────────────────────────────────────────────────────────────────────────

    socket.on('voicechat', function (data) {
        translateIt(data.message,data)
        sayHello = function(translation,data){
 var passBack = {
            chatData: data,
            transText:translation
     }
       io.sockets.emit('voicechat', passBack);
             console.log(`Translation: ${translation}`);
            console.log("hello");
        }
    })
});

// this function sends back watson's response through a channel
runIo = function () { io.sockets.emit('chat', newData); }





// ────────────WATSON CONVO────────────────────────────────────────────────────────────────────
// Set up Conversation service.
var conversation = new ConversationV1({
    username: 'f55b9412-ae70-4d7f-aa15-65108e3cab1c', // replace with username from service key
    password: 'rNtonaEkcb6b', // replace with password from service key
    path: { workspace_id: '65572c75-f41d-4a25-b257-50ab9aaca64c' }, // replace with workspace ID
    version_date: '2016-07-11'
  });
  
  // Start conversation with empty message.
  conversation.message({}, processResponse);
  
  
  // Process the conversation response.
  function processResponse(err, response) {
    if (err) {
      console.error(err); // something went wrong
      return;
    }
    var endConversation = false;
    // Check for action flags.
    if (response.output.action === 'display_time') {
      // User asked what time it is, so we output the local system time.
      console.log('The current time is ' + new Date().toLocaleTimeString());
    } else if (response.output.action === 'end_conversation') {
      // User said goodbye, so we're done.
      console.log(response.output.text[0]);
      endConversation = true;
    } else {
      // Display the output from dialog, if any.
      if (response.output.text.length != 0) {
        console.log(response.output.text[0]);
        // makes sure values for questions are set
        sentQuestions = response.output.text[0];
        setQuestion(sentQuestions);
  
  
        // here I collect all values entered into watson
        if (response.context.location && response.context.rooms && response.context.houseorapp && response.context.currency && response.context.residencetype) {
          collectedValues.push(response.context.location);
          collectedValues.push(response.context.houseorapp);
          collectedValues.push(response.context.residencetype);
          collectedValues.push(response.context.rooms);
          collectedValues.push(response.context.currency);
          console.log("these are collected values", collectedValues);
          userData = collectedValues;
          require("./routing/apiRoutes")(app, userData);
        }
      }
    }
  
  
    // If we're not done, prompt for the next round of input.
    passNewMessage = function (theInfo) {
        console.log("from watson");
        console.log(theInfo);
      if ((!endConversation) && reRun) {
        conversation.message({
          input: { text: theInfo },
          // Send back the context to maintain state.
          context: response.context,
        }, processResponse);
      }
    }
  }
