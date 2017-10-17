var express = require('express');
var app = express();
var exphbs = require('express-handlebars');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
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























// // ────────TEXT TO SPEECH ────────────────────────────────────────────────────────────────────────

// Imports the Google Cloud client library
// const Speech = require('@google-cloud/speech');
// const fs = require('fs');

// // Your Google Cloud Platform project ID
// const projectId = 'your-project-id';

// // Instantiates a client
// const speechClient = Speech({
//   projectId: projectId
// });

// // The name of the audio file to transcribe
// const fileName = './resources/audio.raw';

// // Reads a local audio file and converts it to base64
// const file = fs.readFileSync(fileName);
// const audioBytes = file.toString('base64');

// // The audio file's encoding, sample rate in hertz, and BCP-47 language code
// const audio = {
//   content: audioBytes
// };
// const config = {
//   encoding: 'LINEAR16',
//   sampleRateHertz: 16000,
//   languageCode: 'en-US'
// };
// const request = {
//   audio: audio,
//   config: config
// };

// // Detects speech in the audio file
// speechClient.recognize(request)
//   .then((data) => {
//     const response = data[0];
//     const transcription = response.results.map(result =>
//         result.alternatives[0].transcript).join('\n');
//     console.log(`Transcription: ${transcription}`);
//   })
//   .catch((err) => {
//     console.error('ERROR:', err);
//   });





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




  app.listen(PORT,() => {
    console.log(`You are listening through port ${PORT}`);
 })