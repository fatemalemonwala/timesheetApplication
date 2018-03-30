"use strict";

// Needed to use Express.js framework
var express = require ('express');

// Init express framework
var app = express();

// Needed to use handlebars for generating views
var handlebars = require ('express-handlebars');

// Needed for parsing GET and POST methods
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Use main.handlebars as default layout
app.engine('handlebars',
			handlebars({defaultLayout : 'main'}));

// Use handlebar files for views			
app.set('view engine', 'handlebars');

// Check in public directory for static content
app.use(express.static(__dirname + '/public'));

// Get the router that handles all employee requests
var routes = require('./routes/index');

// Apply router to the home page itself
app.use('/', routes);

// Handle 404 errors
app.use(function(req, res) {
	res.status(404);
	// Use 404.handlebars
	res.render('404');
});

// Start server
app.listen(3000);