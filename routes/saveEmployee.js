"use strict";

var DB = require ('./mongodb');
var Employee = DB.getEmployeeTable();
var Credential = DB.getCredentialTable();


module.exports = 
	function employeesList(req, res, err){
		// For keeping manager's username
		var uname = req.body.uname;
		
		//Employee data
		var username = req.body.username
		var psw = req.body.psw;
		psw = crypto.createHash('md5').update(psw).digest('hex');
		var firstName = req.body.firstname;
		var lastName = req.body.lastname;
		var team = req.body.team;
		var payRate = req.body.payrate;
		var overtimePayRate = req.body.overtimepayrate;

		// See if the user already exists		
		Employee.findOne({username : username}, function(err, employee){
			if (employee) { // Employee already exists
				res.render('addEmployee', {title : 'Error',
										uname : uname,
										error : 'Employee already exists'});
				return;
			}
			credential = new Credential({
				username: username,
				password: psw
			});
			credential.save();
			var employee = new Employee({
				username : username,
				firstName : firstName,
				lastName : lastName,
				team : team,
				payRate : payRate,
				overtimePayRate : overtimePayRate
			});
			employee.save();
			res.redirect('/employees/' + uname);
		});
	}