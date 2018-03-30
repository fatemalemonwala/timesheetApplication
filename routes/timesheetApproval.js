"use strict";

var DB = require('./mongodb');
var TimeSheet = DB.getTimeSheetTable();

module.exports = 
function timesheetsToApprove(req, res, next){
    var username = req.params.uname;
        TimeSheet.find({username : username, approved : false}, 
        function(err, employeeTimeSheets){
			var data = [];
			for (var i = 0; i < employeeTimeSheets.length; i++) {
				var weekStartDate = employeeTimeSheets[i].weekStartDate;
				var dates = [];
				
				// Get all dates of the week for this timesheet
				for (var  j = 0; j < 5; j++) {
					dates.push(new Date(weekStartDate));
					var day = dates[j].getDate() + j;
					dates[j].setDate(day);
				}
				
				// Convert dates to string to display in handlebar
				var dateStringArr = dates.map(function(date){
					var month = date.getMonth() + 1;
					return month + "/" + date.getDate() + "/" + date.getFullYear();				
				});
				
				// Create array of objects to display in handlebar
				data.push({	_id : employeeTimeSheets[i]._id,
							hours : employeeTimeSheets[i].hoursOfWeek,
							dateStringArr : dateStringArr});
			}
			res.render('timesheetApproval',
            {
                title : 'Employees TimeSheets',
                data : data
            }
        );
 
       });
}    