//THIS SNIPPIT RECOGNIZES THE VOICE
var r = document.getElementById('recognizedText');
var r2 = document.getElementById('recognizedText2');
function startConverting() {
  if ('webkitSpeechRecognition' in window) {
    var speechRecognizer = new webkitSpeechRecognition();
    speechRecognizer.continuous = true;
    speechRecognizer.interimResults = true;
    speechRecognizer.lang = 'en-IN';
    speechRecognizer.start();
    var finalTranscripts = '';
    speechRecognizer.onresult = function (event) {
      var interimTranscripts = '';
      for (var i = event.resultIndex; i < event.results.length; i++) {
        var transcript = event.results[i][0].transcript;
        transcript.replace("\n", "<br>");
        if (event.results[i].isFinal) {
          submitTrans();
        } else {
          interimTranscripts += transcript;
        }
      }
      r.innerHTML = finalTranscripts + '<span style="color:1D1D1D">' + interimTranscripts + '</span>';
      /*This is used to grab the inner html value*/
      r2.innerHTML = finalTranscripts + interimTranscripts
    };
    speechRecognizer.onerror = function (event) {
    };
  } else {
    r.innerHTML = 'Your browser is not supported. If google chrome, please upgrade!';
  }
}


/*make socket connection must be changed on deployment*/
/*
var socket = io.connect('https://pure-castle-65829.herokuapp.com/'); 
*/
var socket = io.connect('http://localhost:8080');


/*QUERY THE DOM */
var message = document.getElementById('messageId');
var handle = document.getElementById('handle');
var btn = document.getElementById('send');
var chatOutput = document.getElementById('chatOutput');
var comingBack = document.getElementById('comingBack');
// This div emmits messages coming back from watson
var output = document.getElementById('output');
/*Takes the message collected by voice recg and emit via socket */
function submitTrans() {
  socket.emit('voicechat', {
    message: r2.innerHTML.trim(),
    handle: handle.value
  })

  socket.emit('chat', {

      message:r2.innerHTML.trim()})
      message.value = "";
}

/*listens for emits from back end */
/* data.transText + this code collects the untransfered text*/
socket.on('voicechat', function (data) {
  chatOutput.innerHTML += '<p><strong>' + data.chatData.handle + ': </strong>' + data.chatData.message + '</p>'
  console.log(data.transText.trim());
});


socket.on('watsonTalk', function (data) {
  comingBack.innerHTML += '<p><strong>' + data.hbData+ ': </strong></p>'
  console.log(data.hbData);
});
//Here we use this socket to pass the first message from watson 
socket.on('start',function(data){
      output.innerHTML ='<p>' + data.message+ '</p>'
   })


// listen for events coming from watson and outputs content
socket.on('chat',function(data){
      output.innerHTML ='<p>' + data.message+ '</p>'
   })
