// node/express application
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var validation = require('./modules/validation');
var todaysDate = require('./modules/todaysDate');

// puts post request body data and store it on req.body
app.use(bodyParser.urlencoded({extended: true}));

app.set('port', process.env.PORT || 3000);

// Our song data
var songs = [
  {
    artist: "Bruce Springstein",
    title: "Born in the U.S.A.",
    dateAdded: 'Tuesday, November 8, 2016'
  }
];

// Routes
app.post('/songs', function(req, res) {
  // req.body is supplied by bodyParser above
  console.log("REQ body: ", req.body);
  var newSong = req.body;
  newSong.dateAdded = todaysDate.todaysDate();

//validation for dupes
var isDuplicate = validation.dupeCheck(songs, newSong);
//validation for blanks
var isBlank = validation.blankCheck(newSong);

//preventing post if song is a duplicate or blank
  if(isDuplicate == true || isBlank == true) {
  res.sendStatus(400);
} else {
  res.sendStatus(201);
  songs.push(newSong);
}

});

app.get('/songs', function(req, res) {
  // response options
  res.send(songs);
});

// static file routing
app.get('/*', function(req, res) {
  var file = req.params[0] || '/views/index.html';
  console.log(file);

  res.sendFile(path.join(__dirname, './public/', file));
  // /public/views/index.html
});

app.listen(app.get('port'), function() {
  console.log('Server is listening on port ' + app.get('port'));
});
