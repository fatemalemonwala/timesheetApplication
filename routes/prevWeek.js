module.exports = 
	function getPrevWeek(req, res, next) {
		var dateInt = parseInt(req.body.datepw);
		var date = new Date(dateInt);
		var day = date.getDate() - 7;
		date.setDate(day);
		
		var uname = req.body.unamepw;
		res.redirect('/timesheet/'+ uname + '/' + date.getTime());
	}