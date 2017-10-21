
module.exports = function(app, userData) {
  console.log(userData);
  app.get("/api", function(req, res) {
   console.log(userData);
    // res.json(properties);
  });

  
  