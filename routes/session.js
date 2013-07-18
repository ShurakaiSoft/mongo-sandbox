/**
 * session routes
 */

var User = require('../data/models/user');
var notLoggedIn = require('./middleware/not_logged_in');

module.exports = function (app) {
		
	app.get('/session/new', notLoggedIn, function (req, res) {
		res.render('session/new', { title: "Log in" });
	});
	
	app.post('/session', notLoggedIn, function (req, res) {
		User.findOne({username: req.body.username}, function (err, user) {
			if (err) {
				throw err;
			}
			user = user || {};
			if (user.password === req.body.password) {
				req.session.user = user;
				res.redirect('/users');
			} else {
				console.log("Invalid user/password combination");
				res.redirect('/session/new');
			}
		});
	});
	
	app.del('/session', function (req, res) {
		req.session.destroy();
		res.redirect('/users');
	});
};
