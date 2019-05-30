var express = require("express");
var app = express();

var path = __dirname;

app.use(express.static('public'));
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

app.get("/", function(req, res) {
  console.log("Sending /public/index.html");
  res.sendFile(path + "/public/index.html");
});

console.log("Listening on http://localhost:3000");
app.listen(3000);