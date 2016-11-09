//validation for duplicates
function dupeCheck(songs, newSong) {
  for (var i = 0; i < songs.length; i++) {
    if(newSong.title == songs[i].title && newSong.artist == songs[i].artist) {
      return true;
    }
  }
}

function blankCheck(newSong) {
  //validation for blanks
  	if(newSong.title == '' || newSong.artist == '') {
  		return true;
  	}
}


module.exports.dupeCheck = dupeCheck;
module.exports.blankCheck = blankCheck;
