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

module.exports.todaysDate = todaysDate;
