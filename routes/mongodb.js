"use strict";

/* Use mongoose Schema and Model with MongoDB */
var mongoose = require ('mongoose');

/* Path to Employee DB on MongoDB */
var dbUrl = 'mongodb://127.0.0.1:27017/employeedb';

var connection = null;
var employeeTable = null;
var credentialTable = null;
var timeSheetTable = null;

var Schema = mongoose.Schema;

// create a schema for credentials
var credentialsSchema = new Schema({
	username : {
		type: String,
		required: true},
	password : {
		type: String,
		required: true}	
});

/* Create new Schema for saving data */
var employeeSchema = new Schema({
	username : {
		type: String,
		required: true	
	},
	firstName : {
		type: String,
	required: true}, 
	lastName : {
		type: String,
		required: true
	},
	team: {
		type: String,
		required: true
	},
	access:  Boolean,
	payRate : {
		type : Number,
		required: true
	},
	overtimePayRate : {
		type : Number,
		required: true
	}
});

var timeSheetSchema = new Schema({	
	username : {
		type: String,
		required: true	
	},
	
	weekStartDate : {
		type: Date,
		required: true
	},
	approved : {
		type : Boolean
	},
	hoursOfWeek: [Number],
	totalPay : Number,
	totalHours : Number
});

/* Function initializes DB connection and model*/
var setupConnection = function() {
	console.log("Creating connection and model...");
	connection = mongoose.createConnection(dbUrl);
	employeeTable = connection.model("employee", 
			employeeSchema);
	credentialTable = connection.model("credential", credentialsSchema);
	timeSheetTable = connection.model("timeSheet", timeSheetSchema);
}



module.exports = {
	// Export singleton model object for other modules 
	getEmployeeTable : function getEmployeeTable() {
		// Create a new connection and model if not created yet for employeeTable 
		if (connection == null) {
			setupConnection();
		}
		
		// Return model, existing model is returned if already created 
		return employeeTable;
	},
	
 
	// Export singleton model object for other modules 
	getCredentialTable : function getCredentialTable() {
		// Create a new connection and model if not created yet for employeeTable 
		if (connection == null) {
			setupConnection();
		}
		
		// Return model, existing model is returned if already created 
		return credentialTable;
	},	
	
	getTimeSheetTable : function getTimeSheetTable() {
		// Create a new connection and model if not created yet for employeeTable 
		if (connection == null) {
			setupConnection();
		}
		
		// Return model, existing model is returned if already created 
		return timeSheetTable;
	},
	
	/* Export singleton connection object for other modules */
	getConnection : function getConnection() {
		/* Create a new connection and model if not created yet */
		if (connection == null) {
			setupConnection();
		}
		
		/*Return connection, existing connection is returned if already created */
		return connection;
	}
};
