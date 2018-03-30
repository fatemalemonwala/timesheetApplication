// Renders login form

module.exports = function loginPage(req, res, next){
	res.render ('displayloginForm',
		{title:"Login Page"});
};