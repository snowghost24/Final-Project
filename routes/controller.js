var express = require('express');
var router = express.Router();

var parseString = require('xml2js').parseString;




     

router.get('/',(req,res)=>{
    
   res.render('index.handlebars')
})

router.get('/voice',(req,res)=>{
   
      res.render('voice.handlebars')
   });

   router.get('/house',(req,res)=>{
      parseString(req.body, function (err, result) {
            console.dir(req.body);
        });
        
      })

module.exports = router;