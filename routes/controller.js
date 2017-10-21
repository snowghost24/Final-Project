var express = require('express');
var router = express.Router();

var parseString = require('xml2js').parseString;
var axios = require('axios');

var street = encodeURIComponent(" 2514 hiker court");
var city = encodeURIComponent("kissimmee FL");
var count = 2;
var zpid = 48749425;















router.get('/',(req,res)=>{
      axios.post(`http://www.zillow.com/webservice/GetSearchResults.htm?zws-id=X1-ZWz18yof9snguj_4eq90&address=${street}&citystatezip=${city}`)
      .then(function (response) {
      //   console.log(response.data);
        var theData = response.data;
        parseString(theData, {trim: true}, function (err, result) {
              var theZpid = result['SearchResults:searchresults'].response[0].results[0].result[0].zpid[0];
              nextCall(theZpid);
      });
      })
      .catch(function (error) {
        console.log(error);
      });
      
      function nextCall(theZpid){
            axios.post(`http://www.zillow.com/webservice/GetDeepComps.htm?zws-id=X1-ZWz18yof9snguj_4eq90&zpid=${theZpid}&count=${count}&rentzestimate=true`)
            .then(function (response) {
            //   console.log(response.data);
              var theData = response.data;
              parseString(theData, {trim: true}, function (err, result) {
                  results = result['Comps:comps'].response[0].properties[0].comparables[0]
                  for (var i = 0; i < count; i++) {
                    console.log(results.comp[i]. yearBuilt)        
                  } 
            }); 
            })
            .catch(function (error) {
              console.log(error);
            });  
      }
   res.render('index.handlebars')
})
// ────────────────────────────────────────────────────────────────────────────────

router.post('/made',(req,res)=>{

  console.log(req.body.responseData[0])
  var street = encodeURIComponent(req.body.responseData[0]);
  var city = encodeURIComponent(req.body.responseData[1]+" "+req.body.responseData[2]);
  var lastSold = "";
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


  axios.post(`http://www.zillow.com/webservice/GetSearchResults.htm?zws-id=X1-ZWz18yof9snguj_4eq90&address=${street}&citystatezip=${city}`)
  .then(function (response) {
  //   console.log(response.data);
    var theData = response.data;
    parseString(theData, {trim: true}, function (err, result) {
          var theZpid = result['SearchResults:searchresults'].response[0].results[0].result[0].zpid[0];
          nextCall(theZpid);
  });
  })
  .catch(function (error) {
    console.log(error);
  });
  
  function nextCall(theZpid){
        axios.post(`http://www.zillow.com/webservice/GetDeepSearchResults.htm?zws-id=X1-ZWz18yof9snguj_4eq90&zpid=${theZpid}&address=${street}&citystatezip=${city}`)
        .then(function (response) {
        //   console.log(response.data);
          var theData = response.data;
          // console.log(theData);
      parseString(theData, {trim: true}, function (err, result) {  
                lastSold = result["SearchResults:searchresults"].response[0].results[0].result[0].lastSoldDate[0];
        console.log(lastSold);
       }); 
        })
        .catch(function (error) {
          console.log(error);
        });  
  }

                    
      // res.render('index.handlebars'{hbData :})
   });
// ────────────────────────────────────────────────────────────────────────────────

  //  router.get('/house',(req,res)=>{
  //     parseString(req.body, function (err, result) {
  //        console.dir(req.body);
  //     });
  //  })

module.exports = router;