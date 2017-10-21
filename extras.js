 
 
 
 
   // axios.post(`http://www.zillow.com/webservice/GetSearchResults.htm?zws-id=X1-ZWz18yof9snguj_4eq90&address=${street}&citystatezip=${city}`)
  // .then(function (response) {
  // //   console.log(response.data);
  //   var theData = response.data;
  //   parseString(theData, {trim: true}, function (err, result) {
  //         // var theZpid = result['SearchResults:searchresults'].response[0].results[0].result[0].zpid[0];
  //         var soldDate = result['SearchResults:searchresults'].response[0].results[0].result[0].zestimate[0]
  //         console.log(soldDate);
  // });
  // })
  // .catch(function (error) {
  //   console.log(error);
  // });

 
 
 
 
 // ────────────────────────────────────────────────────────────────────────────────

 
 // app.get("/api/apiRoutes", function(req, res) {
  //  console.log(userData);
  //   // res.json(properties);
  // });


// ───────FRONT END  AJAX REQUEST TO ZILLOW─────────────────────────────────────────────────────────────────────────

/*
var street = encodeURIComponent(" 2514 hiker court");
var city = encodeURIComponent("kissimmee FL");
var count = 10;
var zpid = 48749425;


$.ajax({
  type: 'POST',
  url: `http://www.zillow.com/webservice/GetSearchResults.htm?zws-id=X1-ZWz18yof9snguj_4eq90&address=${street}&citystatezip=${city}`,
  dataType: "xml",
  success: function (xmlDoc) {
    var x2js = new X2JS();
    var jsonObj = x2js.xml2json(xmlDoc);
    var theZip = jsonObj.searchresults.response.results.result.zpid;
    console.log(theZip);
    nextCall(theZip)
  }
});

function nextCall(theZip) {
  $.ajax({
    type: 'POST',
    url: `http://www.zillow.com/webservice/GetDeepComps.htm?zws-id=X1-ZWz18yof9snguj_4eq90&zpid=${theZip}&count=10&rentzestimate=true`,
    dataType: "xml",
    success: function (xmlDoc) {
      var x2js = new X2JS();
      var jsonObj = x2js.xml2json(xmlDoc);
      var responseArray = jsonObj.comps.response.properties.comparables.comp;
      for (i = 0; i < responseArray.length; i++) {
        console.log(responseArray[i]);
      }
    }
  });
}

*/

// ───────VOICE EMITTER CODE─────────────────────────────────────────────

   
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