var express = require('express');
var router = express.Router();

router.get('/',(req,res)=>{

   res.render('index.handlebars')
})

router.get('/voice',(req,res)=>{
   
      res.render('voice.handlebars')
   })

module.exports = router;