
var DB = require('./mongodb.js');
var credentials = DB.getCredentialTable();
"use strict";

var Employee = DB.getEmployeeTable();
var crypto = require('crypto');

// Look up database for the credentials

module.exports = 
	function verifyLogin(req, res, next){
		var uname = req.body.uname;
		var psw = req.body.psw;
		psw = crypto.createHash('md5').update(psw).digest('hex');

		//console.log(uname, psw);
		
		credentials.findOne({'username': uname, 'password': psw},
			function(err, credential){
				if (err)
				console.log("Error : %s", credential);
				else {
					Employee.findOne({'username': uname},
				function (err, employee){
					if (employee.access == true){
						res.redirect('/employees/' + uname);
					}
					else {
						res.redirect('/timesheet/' + uname);
					}
				});
				}
				
			});
	};
