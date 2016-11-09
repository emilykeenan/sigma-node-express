// node/express application
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');


function todaysDate() {
var dayNames = new Array("Sunday","Monday","Tuesday","Wednesday",
				"Thursday","Friday","Saturday");
var monthNames = new Array(
"January","February","March","April","May","June","July",
"August","September","October","November","December");

var now = new Date();
return dayNames[now.getDay()] + ", " +
monthNames[now.getMonth()] + " " +
now.getDate() + ", " + now.getFullYear();
}

// function validateSong(song) {
//   for (var i = 0; i < songs.length; i++) {
//     if(song.title === songs[i].title) {
//       return true;
//     } else {
//       return false;
//     }
//   }
// }

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
  var isDuplicate = false;
  newSong.dateAdded = todaysDate();

//validation
  for (var i = 0; i < songs.length; i++) {
    if(newSong.title == songs[i].title && newSong.artist == songs[i].artist) {
      isDuplicate = true;
    }
  }

//preventing post if song is a duplicate
  if(isDuplicate == true) {
  res.sendStatus(400);
} else {
  res.sendStatus(201);
  songs.push(newSong);
}

});

app.get('/songs', function(req, res) {
  console.log('handling get request for songs');
  // response options
  // res.sendStatus(200);
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
