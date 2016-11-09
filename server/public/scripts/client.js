// var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

$(document).ready(function() {
  console.log("it's alive!");

  $("#postSongForm").on("submit", function(event) {
    event.preventDefault();
    var newSong = {};

    $.each($('#postSongForm').serializeArray(), function(i, field) {
      newSong[field.name] = field.value;
    });

    console.log(newSong);
    // send song object to the Server
    $.ajax({
      type: 'POST',
      url: '/songs',
      data: newSong,
      success: function(response) {
        console.log(response);
        if(response == "Created") {
          getSongs();
        } else {
          alert("Oh no! Your song didn't save correctly.");
        }
      },
      error: function(error) {
        console.log(error);
        if(error.status == 400) {
          alert("That song already exists! Try again!");
        }
      }
    })


    // $('#postSongForm').children().html('');

  })

  getSongs();

  function getSongs() {
    $.ajax({
      type: 'GET',
      url: '/songs',
      success: function(songData) {
        songsToDom(songData);
      }
    });
  }

  function songsToDom(songs) {
    $("#songContainer").empty();

    for (var i = 0; i < songs.length; i++) {
      $("#songContainer").append('<div class="song"></div>');
      var $el = $("#songContainer").children().last();
      $el.append('<h3>' + songs[i].title + '</h3>');
      $el.append('<p>By: ' + songs[i].artist + '</p>');
      $el.append('<p>Date Added: ' + songs[i].dateAdded + '</p>')
      // songs[i].dateAdded = todaysDate();
    }

  }

//function to set today's date
// function todaysDate() {
//   // Array of days
// var dayNames = new Array("Sunday","Monday","Tuesday","Wednesday",
// 				"Thursday","Friday","Saturday");
// // Array of month Names
// var monthNames = new Array(
// "January","February","March","April","May","June","July",
// "August","September","October","November","December");
//
// var now = new Date();
// return dayNames[now.getDay()] + ", " +
// monthNames[now.getMonth()] + " " +
// now.getDate() + ", " + now.getFullYear();
// }


});
