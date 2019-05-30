const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
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

app.get("/yee", function(req, res) {
  // Load client secrets from a local file.
  fs.readFile('credentials.json', (err, content) => {
    if (err) return console.log('Error loading client secret file:', err);

    // Authorize a client with credentials, then generate a URL to get user code
    const {client_secret, client_id, redirect_uris} = JSON.parse(content).installed;
    const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES,
    });
    oAuth2Client.urlToAccess = authUrl;
    console.log("BEFORE THE SEND");
    console.log(oAuth2Client);
    var thing = JSON.stringify(oAuth2Client);
    thing = JSON.parse(thing);
    console.log("The original token:");
    console.log(oAuth2Client);
    console.log("The mimic:");
    console.log(thing);
    thing.getToken(null, (err, token) => {
      console.log("i happened");
    });
    res.send(JSON.stringify(oAuth2Client));
  });
});

app.post("/haw", function(req, res) {
  res.send(listTaskLists(JSON.parse(req.body.oauth), req.body.key));
});

console.log("Listening on http://localhost:3000");
app.listen(3000);

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/tasks.readonly'];



/**
 * Lists the user's first 10 task lists.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function listTaskLists(auth, code) {
  console.log(auth);
  try {
    auth.getToken(code, (err, token) => {
      console.log("I happened");
    });
  } catch (error) {
    console.log("I did not happen");
  }
  // auth.getToken(code, (err, token) => {
  //   if (err) return console.error('Error retrieving access token', err);
  //   auth.setCredentials(token);
  // });
  // const service = google.tasks({version: 'v1', auth});
  // service.tasklists.list({
  //   maxResults: 10,
  // }, (err, res) => {
  //   if (err) return console.error('The API returned an error: ' + err);
  //   const taskLists = res.data.items;
  //   return taskLists;
  // });
}