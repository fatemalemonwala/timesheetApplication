"use strict";

var DB = require ('./mongodb');
var Employees = DB.getEmployeeTable();


module.exports = 
	function employeesList(req, res, err){
		var uname = req.params.uname; 
		Employees.find({}, function(err, employees){
			res.render('employees', {title : 'Employee List', 
									 uname : uname,
									 data : employees});
			
			});
		}