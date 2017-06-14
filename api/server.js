const express = require("express");
const bodyParser = require("body-parser");
const config = require("./config");
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.text({type: '*/*'}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(function(err, req, res, next) {
  
  if (err.status == 500) {
	 //log the error and return a generic message
	console.log(err);
	res.status(500).send('Something broke!');
  }
  else
	  res.status(err.status).send(err.stack);
});

const routes = require("./routes.js")(app);

const server = app.listen(config.server_port, function() {
  console.log("Listening on port %s", server.address().port);
});

module.exports = server;