"use strict";

// Implements router for handling all requests
var express = require('express');
var router = express.Router();

// Grab all functions to route requests to
var login = require('./login');
var verifyLogin = require('./verifyLogin');
var displayTimeSheet = require('./displayTimeSheet');
var currentTimeSheet = require('./currentTimeSheet');
var submitSheet = require('./submitSheet');
var employees = require('./employees');
var timesheetsToApprove = require('./timesheetApproval');
var approve = require('./approve');
var nextWeek = require('./nextWeek');
var prevWeek = require('./prevWeek');
var viewPaySlips = require('./viewPaySlips');
var addEmployee = require('./addEmployee');
var saveEmployee = require('./saveEmployee');

// Display login page
router.get('/login', login );

router.post('/login',verifyLogin);
router.get('/timesheet/:uname', currentTimeSheet);
router.get('/timesheet/:uname/:date', displayTimeSheet);
router.post('/submitSheet', submitSheet);
router.get('/employees/:uname', employees);
router.get('/approvetimesheet/:uname', timesheetsToApprove);
router.post('/approve', approve);
router.post('/nextweek', nextWeek);
router.post('/prevweek', prevWeek);
router.get('/payslips/:uname', viewPaySlips);
router.get('/addemployee/:uname', addEmployee);
router.post('/addemployee/', saveEmployee);

module.exports = router;

