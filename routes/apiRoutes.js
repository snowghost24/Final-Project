

var parseString = require('xml2js').parseString;
var axios = require('axios');
var count = 2;
var lastSold = "";
var pass1;

module.exports = function(app,io) {
    app.post("/made",(req,res)=>{
      console.log(req.body.responseData[0])
      var street = encodeURIComponent(req.body.responseData[0]);
      var city = encodeURIComponent(req.body.responseData[1]+" "+req.body.responseData[2]);
      
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
            // console.log(res);
            var passBack= {hbData:lastSold}
            io.sockets.emit('watsonTalk', passBack);
            console.log("it redirected");
            // pass1(lastSold);
           }); 
            })
            .catch(function (error) {
              console.log(error);
            });  
      }
    
                        
          // res.render('index.handlebars'{hbData :})
       });
    
    
    
   

      }


  
  