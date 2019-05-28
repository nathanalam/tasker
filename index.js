var express = require("express");
var app = express();

var path = __dirname;

app.use("/public", express.static(path + "/public"));

app.get("/", function(req, res) {
  res.sendFile(path + "/index.html");
});


console.log("Listening on http://localhost:3000");
app.listen(3000);
