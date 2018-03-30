module.exports = 
	function employeesList(req, res, err){
		var uname = req.params.uname;
		res.render('addEmployee', {title : 'Add Employee',
						uname : uname});
	}