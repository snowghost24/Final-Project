
   // <input type="button" value="Stop speech command recognition" id="stop">
   // <script>
   
   //    function turnToXml(results){
      
   //   $.ajax({
   //       url:"/house",
   //       data: results
   //     }).done(function(results) {
   //       console.log(results)
         
   //     });
   //    }
     
   
   //   btn.addEventListener('click', function () {
   //      socket.emit('chat', {
   //         message: message.value,
   //         handle: handle.value
   //      })
   //   })
   

   
   
   
   // chatOutput.innerHTML += '<p><strong>' + data.chatData.handle + ': </strong>' + data.chatData.message + data.transText.text +'</p>'
          
   //         chatOutput.innerHTML += '<p><strong>' + data.chatData.handle + ': </strong>' + data.transText +'</p>'
          
          
   
   //   navigator.mediaDevices.getUserMedia({
   //     audio: true
   //   })
   //     .then(stream => {
   //       const recorder = new MediaRecorder(stream);
   //       const recognition = new webkitSpeechRecognition();
   //       const synthesis = new SpeechSynthesisUtterance();
   //       const handleResult = e => {
   //         recognition.onresult = null;
   //         console.log(e.results);
   //         const result = e.results[e.results.length - 1];
   
   //         if (result.isFinal) {
   //           const [{ transcript }] = result;
   //           console.log("-------------------")
   //           console.log(transcript);
   //           console.log("-------------------")
   //           synthesis.text = transcript;
   //           window.speechSynthesis.speak(synthesis);
   //         }
   //       }
   //       synthesis.onstart = () => {
   //         if (recorder.state === "inactive") {
   //           recorder.start()
   //         } else {
   //           if (recorder.state === "paused") {
   //             recorder.resume();
   //           }
   //         }
   //       }
   //       synthesis.onend = () => {
   //         recorder.pause();
   //         recorder.requestData();
   //       }
   //       recorder.ondataavailable = async (e) => {
   //         if (stream.active) {
   //           try {
   //             const blobURL = URL.createObjectURL(e.data);
   //             const request = await fetch(blobURL);
   //             const ab = await request.arrayBuffer();
   //             console.log(blobURL, ab);
   //             recognition.onresult = handleResult;
   //             // URL.revokeObjectURL(blobURL);
   //           } catch (err) {
   //             throw err
   //           }
   //         }
   //       }
   //       recorder.onpause = e => {
   //         console.log("recorder " + recorder.state);
   //       }
   //       recognition.continuous = true;
   //       recognition.interimResults = false;
   //       recognition.maxAlternatives = 1;
   //       recognition.start();
   //       recognition.onend = e => {
   //         console.log("recognition ended, stream.active", stream.active);
   
   //         if (stream.active) {
   //           console.log(e);
   //           // the service disconnects after a period of time
   //           recognition.start();
   //         }
   //       }
   //       recognition.onresult = handleResult;
   
   //       stream.oninactive = () => {
   //         console.log("stream ended");
   //       }
   
   //       document.getElementById("stop")
   //         .onclick = () => {
   //           console.log("stream.active:", stream.active);
   //           if (stream && stream.active && recognition) {
   //             recognition.abort();
   //             recorder.stop();
   //             for (let track of stream.getTracks()) {
   //               track.stop();
   //             }
   //             console.log("stream.active:", stream.active);
   //           }
   //         }
   
   //     })
   //     .catch(err => {
   //       console.error(err)
   //     });
   // </script> 