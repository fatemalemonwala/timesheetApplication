var DB = require('./mongodb.js');
"use strict";

function getCurrentStartDate() {
	d = new Date;
	
	// Set hours, minutes, seconds, milliseconds to 0
	d.setHours(0,0,0,0);
	
	// Get today's day of week
	var day = d.getDay();
	
	//Set to this week's monday
	diff = d.getDate() - day + (day == 0 ? -6 : 1);
	d.setDate(diff);
	
	return d.getTime();
}

module.exports = 
	function currentTimeSheet(req, res, next){
		var uname = req.params.uname;
		var startDate = getCurrentStartDate();
		res.redirect('/timesheet/' + uname + '/' + startDate);
	}