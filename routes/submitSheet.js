"use strict";

var DB = require('./mongodb.js');
var TimeSheet = DB.getTimeSheetTable();

module.exports =
		function submitTimeSheet(req, res, next){
			var monHours = parseInt(req.body.monHours);
			var tueHours = parseInt(req.body.tueHours);
			var wedHours = parseInt(req.body.wedHours);
			var thuHours = parseInt(req.body.thuHours);
			var friHours = parseInt(req.body.friHours);
			var uname = req.body.uname;
			var timestamp = parseInt(req.body.date);
			var date = new Date(timestamp);
			
			var hoursOfWeek = [monHours, tueHours, wedHours,
								thuHours, friHours];
			
			console.log(hoursOfWeek + " " + uname + " " + timestamp);
			TimeSheet.findOneAndUpdate(
				{username : uname, weekStartDate : date},
				{$set :{hoursOfWeek : hoursOfWeek}}, 
				{ new : true}, function (err, timesheet) {
					if (err)
						console.log("Error - " + err);
						return;
					if (!timesheet) {
						res.render('404');
					}
						
					console.log(timesheet);
				});
				
			res.redirect('/timesheet/' + uname + '/' + timestamp);
			
}