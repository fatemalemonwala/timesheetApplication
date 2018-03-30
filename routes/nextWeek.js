module.exports = 
	function getNextWeek(req, res, next) {
		var dateInt = parseInt(req.body.datenw);
		console.log(dateInt);
		var date = new Date(dateInt);
		var day = date.getDate() + 7;
		date.setDate(day);
		
		var uname = req.body.unamenw;
		res.redirect('/timesheet/'+ uname + '/' + date.getTime());
	}


