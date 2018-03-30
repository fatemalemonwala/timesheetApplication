"use strict";

var DB = require('./mongodb.js');
var TimeSheet = DB.getTimeSheetTable();
var Employee = DB.getEmployeeTable();

module.exports = 
	function viewPaySlips(req, res, next){
		var username = req.params.uname;
		Employee.findOne({'username' : username}, function(err, employee) { 
			if (!employee) {
				res.render('404');
			}

			TimeSheet.find({'username' : username, approved : true}, null, {sort : {weekStartDate : -1}}, function(err, paySlips){
				if (!paySlips) {
					res.render('404');
					return;
				}
				
				// Convert Week start Date datatype to date string for handlebar
				var dateStringArr = []; 
				for (var i = 0 ; i < paySlips.length; i++) {
						var date = paySlips[i].weekStartDate;
						var month = 1 + date.getMonth();
						dateStringArr.push(month + "/" + date.getDate() + "/" + date.getFullYear());
				}
				
				var title = 'Payslips for ' + employee.firstName + " " + employee.lastName;
				
				// Data array to be used by veiwPaySlip handlebar
				var paySlipsDataArray = [];
				for (var i = 0 ; i < paySlips.length; i++) {
					var totalPay = paySlips[i].totalPay;
					var totalHours = paySlips[i].totalHours;
					
					var paySlipData = {
						weekStartDate : dateStringArr[i],
						totalPay      : totalPay,
						totalHours    : totalHours
					};
					paySlipsDataArray.push(paySlipData);
				}
				
				res.render('displayPaySlips', { title :  title,
												uname :  username,
												data  :  paySlipsDataArray
											  });
			});
		});
	}
	