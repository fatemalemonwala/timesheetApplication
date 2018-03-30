// Implements router for handling all requests
var express = require('express');
var router = express.Router();

// Grab all functions to route requests to
var login = require('login');


// Display login page
router.get('/login', login );

