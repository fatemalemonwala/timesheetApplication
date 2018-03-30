"use strict";

/* Used to create the employeedb and and add three documents to the collection */

/* Get Employee Model (using mongoose and MongoDB)*/
var DB = require('./routes/mongodb.js')
var Employee = DB.getEmployeeTable();
var Credential = DB.getCredentialTable();
var TimeSheet = DB.getTimeSheetTable();
var connection = DB.getConnection();
var crypto = require('crypto');


/* Add documents in collection once connection is setup */
connection.on('open', function(){
	var pass1 = 'moiz';
	var pass2 = 'aashima';
	
	var pass1 = crypto.createHash('md5').update(pass1).digest('hex');	
	var pass2 = crypto.createHash('md5').update(pass2).digest('hex');
	
	/* Add three employee documents to the newly created collection*/
	var credential;
	
	credential = new Credential({
		username: 'mhaidry',
		password: pass1
	});
	credential.save();
	
	credential = new Credential({
		username: 'flemonwala',
		password: pass2
	});
	credential.save(function(err){
		connection.close();
		if (err) throw err;
		console.log("Credential DB Initialized");
	});
	
	var employee = new Employee({
		username : 'mhaidry',
		firstName : 'Moiz',
		lastName : 'Haidry',
		team : 'QA',
		payRate : 30,
		overtimePayRate : 40
	});
	employee.save();
	
	employee = new Employee({
		username : 'flemonwala',
		firstName : 'Fatema',
		lastName : 'Lemonwala',
		team : 'Manager',
		payRate : 30,
		overtimePayRate : 40,
		access : true
	});
	employee.save();
	
	var d = new Date();
	d.setHours(0, 0, 0, 0);
	
	/*timesheet = new TimeSheet({
		username : 'mhaidry',
		weekStartDate : d,
		hoursOfWeek : [8,5,6,7,9],
		approved : false
	});
	timesheet.save();*/
});
/*
var d = new Date();
d.setHours(0, 0, 0, 0);
d.setDate(24);
Employee.findOne({username : 'mhaidry', 'TimeSheet.weekStartDate' : d}, 'TimeSheet.hoursOfWeek',
		function(err, credential){
				console.log("welcome ", credential);
			});
*/
