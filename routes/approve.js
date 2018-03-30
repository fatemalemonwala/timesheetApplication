var DB = require('./mongodb.js');
var TimeSheet = DB.getTimeSheetTable();
var Employee = DB.getEmployeeTable();

module.exports = 
	function approve(req, res, next){
		var id = req.body.id;
		TimeSheet.findById(id, function (err, timesheet){
			if (!timesheet) {
				res.render('404');
				return;
			}
			Employee.findOne({username : timesheet.username}, function (err, employee) {
				if (!employee) {
					res.render('404');
					return;
				}
				timesheet.approved = true;
				var totalHours = 0;
				var totalPay =  0;
				
				// Calculate total hours of the week for this timesheet
				for (var i = 0; i < timesheet.hoursOfWeek.length; i++) {
					totalHours += timesheet.hoursOfWeek[i];
				}
				
				// Calculate pay
				if (totalHours <= 40)
					totalPay = totalHours * employee.payRate;
				else
					totalPay = (40 * employee.payRate) + ((totalHours - 40) * employee.overtimePayRate);
				
				timesheet.totalHours = totalHours;
				timesheet.totalPay = totalPay;
				timesheet.save();
				res.redirect('/approvetimesheet/'+ timesheet.username );
			});
		});
	}