/*
 * User routes
 */

var async = require('async');
var User = require('../data/models/user');
var notLoggedIn = require('./middleware/not_logged_in');
var loadUser = require('./middleware/load_user');
var restrictUserToSelf = require('./middleware/restrict_user_to_self');

var maxUsersPerPage = 5;

module.exports = function(app) {
	
	app.get('/users', function (req, res, next) {
		var page = req.query.page && parseInt(req.query.page, 10) || 0;
		
		async.parallel([
		    function (next) {
		    	User.count(next);
		    },
		    function (next) {
		    	User.find({})
					.sort({'name': 1})
					.skip(page * maxUsersPerPage)
					.limit(maxUsersPerPage)
					.exec(next);
		    }
        ], function (err, results) {
			var count = 0;
			var users = {};
			var lastPage = 0;
			
			if (err) {
				return next(err);
			}
			count = results[0];
			users = results[1];
			lastPage = (page + 1) * maxUsersPerPage >= count;
			res.render('users/index', { 
				title: 'User Index',
				users: users,
				page: page,
				lastPage: lastPage
			});
		});
	});
	
	app.get('/users/new', notLoggedIn, function (req, res) {
		res.render('users/new', {title: "New User"});
	});
	
	app.get('/users/:name', loadUser, restrictUserToSelf, function (req, res, next) {
		console.log("should not be getting here");
		if (req.user) {
			res.render('users/profile', {title: 'User profile', user: req.user});
		} else {
			next();
		}
	});
	
	app.post('/users', notLoggedIn, function (req, res) {
		User.findOne({ username: req.body.username }, function (err, user) {
			if (err) {
				return next(err);
			}
			if (user) {
				return res.send('Conflict', 409);
			}
			User.create(req.body, function (err) {
				if (err) {
					return next(err);
				}
				res.redirect('/users');
			});
		});
	});
	
	app.del('/users/:name', loadUser, function (req, res, next) {
		req.user.remove(function (err) {
			if (err) {
				return next(err);
			}
			res.redirect('/users');
		});
	});
	
};

