var express = require("express");
var bodyParser = require("body-parser");
var config = require("./config");

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.text({type: '*/*'}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(function(err, req, res, next) {
  
  if (err.status == 500) {
	console.log(err);
	res.status(500).send('Something broke!');
  }
  else
	  res.status(err.status).send(err.stack);
});

var routes = require("./routes.js")(app);

var server = app.listen(config.server_port, function() {
  console.log("Listening on port %s", server.address().port);
});

module.exports = server;