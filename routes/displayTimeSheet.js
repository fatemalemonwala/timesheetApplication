"use strict";

var DB = require('./mongodb.js');
var TimeSheet = DB.getTimeSheetTable();
var Employee = DB.getEmployeeTable();

module.exports =
	function displayTimeSheet (req, res, next){
		var uname = req.params.uname;
		var date = new Date(parseInt(req.params.date));
		Employee.findOne({username : uname}, function(err, employee) {
			if(err)
				console.log("Error Selecting : %s ", err); 
			if (!employee) // Display Not found for invalid ID
				return res.render('404');
			TimeSheet.findOne({username : uname, weekStartDate : date},
					function(err, timesheet) {
						if(err)
							console.log("Error Selecting : %s ", err); 
						
						if (!timesheet) {
							timesheet = new TimeSheet({username : uname,
														weekStartDate : new Date(date),
														hoursOfWeek : [0,0,0,0,0],
														approved : false,
													});
							timesheet.save();
						}
						
						var dates = [];
						for (var  i = 0; i < 5; i++) {
							dates.push(new Date(date));
							var day = dates[i].getDate() + i;
							dates[i].setDate(day);
						}
						
						var dateStringArr = dates.map(function(date){
							var month = date.getMonth() + 1;
							return  month + "/" + date.getDate() + "/" + date.getFullYear();				
						});
						
						res.render('displayTimeSheet',
							{
								title : 'Time Sheet',
								data : {
									firstName : employee.firstName,
									lastName  : employee.lastName,
									team      : employee.team,
									dates     : dateStringArr,
									hours     : timesheet.hoursOfWeek,
									date      : date.getTime(),
									uname	  : uname,
									approved  : timesheet.approved,
									access    : employee.access
								}
							});
					});	
		});
	}